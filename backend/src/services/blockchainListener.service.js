import { electionContract as electionFactoryContract, votingContract, provider } from "../blockchain/index.js";
import Election from '../modules/election/election.model.js';
import Vote from '../modules/vote/vote.model.js';
import logger from '../utils/logger.util.js';

let lastProcessedBlock = -1;

/**
 * Handle ElectionCreated event
 */
const handleElectionCreated = async (electionId, title, creator) => {
    logger.info(`[Blockchain Event] ElectionCreated: ID ${electionId}, Title: ${title}`);
    try {
        const election = await Election.findOne({ title: title });
        if (election && !election.blockchainId) {
            election.blockchainId = electionId.toString();
            await election.save();
            logger.info(`Reconciled election ${title} with blockchainId ${electionId}`);
        }
    } catch (error) {
        logger.error('Error processing ElectionCreated', error);
    }
};

/**
 * Handle VoteCast event
 */
const handleVoteCast = async (electionId, voter, candidateIndex) => {
    logger.info(`[Blockchain Event] VoteCast: Election ${electionId}, Voter ${voter}`);
};

/**
 * Handle VoteHashStored event
 */
const handleVoteHashStored = async (electionId, voteHash) => {
    logger.info(`[Blockchain Event] VoteHashStored: Election ${electionId}, Hash ${voteHash}`);
    try {
        const vote = await Vote.findOne({ voteHash: voteHash.replace('0x', '') });
        if (vote) {
            logger.info(`Vote hash ${voteHash} verified in database.`);
        }
    } catch (error) {
        logger.error('Error processing VoteHashStored', error);
    }
};

export const startBlockchainListeners = async () => {
    logger.info('Initializing Robust Blockchain Event Listeners (Stateless Polling)...');

    try {
        lastProcessedBlock = await provider.getBlockNumber();
        logger.info(`Blockchain listener started. Current block: ${lastProcessedBlock}`);
    } catch (error) {
        logger.error('Could not get initial block number, will retry on next block', error);
    }

    provider.on('block', async (blockNumber) => {
        // If we don't have a starting block, initialize it
        if (lastProcessedBlock === -1) {
            lastProcessedBlock = blockNumber - 1;
            return;
        }

        const targetBlock = blockNumber;
        if (lastProcessedBlock >= targetBlock) return;

        // Alchemy Free Tier limits eth_getLogs to a 10-block range
        const MAX_BATCH_SIZE = 10;

        while (lastProcessedBlock < targetBlock) {
            const fromBlock = lastProcessedBlock + 1;
            const toBlock = Math.min(fromBlock + MAX_BATCH_SIZE - 1, targetBlock);

            try {
                // Query for events in the chunked block range
                const [electionCreatedEvents, voteCastEvents, voteHashEvents] = await Promise.all([
                    electionFactoryContract.queryFilter('ElectionCreated', fromBlock, toBlock),
                    electionFactoryContract.queryFilter('VoteCast', fromBlock, toBlock),
                    votingContract.queryFilter('VoteHashStored', fromBlock, toBlock)
                ]);

                // Process ElectionCreated
                for (const event of electionCreatedEvents) {
                    await handleElectionCreated(...event.args);
                }

                // Process VoteCast
                for (const event of voteCastEvents) {
                    await handleVoteCast(...event.args);
                }

                // Process VoteHashStored
                for (const event of voteHashEvents) {
                    await handleVoteHashStored(...event.args);
                }

                lastProcessedBlock = toBlock;
                logger.info(`Successfully processed blocks ${fromBlock}-${toBlock}`);
            } catch (error) {
                // Handle specific Alchemy errors or generic ones
                if (error.message?.includes('block range')) {
                    logger.warn(`Range too large for Alchemy, retrying with smaller chunk...`);
                    // The loop will handle it on next iteration if we don't update lastProcessedBlock
                } else if (error.code === 'TIMEOUT' || error.code === 'NETWORK_ERROR') {
                    logger.warn(`Polling transient error: ${error.code}. Will retry on next block.`);
                } else {
                    logger.error(`Error querying blocks ${fromBlock}-${toBlock}:`, error);
                }
                break; // Stop chunking for this block trigger and retry next time
            }
        }
    });

};

export default startBlockchainListeners;

