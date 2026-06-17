import { ethers } from "ethers";
import dotenv from "dotenv";

// Import ABI JSON
import ElectionABI from "./abis/Election.json" with { type: "json" };
import VotingABI from "./abis/Voting.json" with { type: "json" };

dotenv.config();

const BLOCKCHAIN_PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;

// 1. Provider & Wallet setup
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const wallet = new ethers.Wallet(BLOCKCHAIN_PRIVATE_KEY, provider);

// 2. Contract Instances
const electionContract = new ethers.Contract(
  process.env.ELECTION_ADDRESS,
  ElectionABI,
  wallet
);

const votingContract = new ethers.Contract(
  process.env.VOTING_ADDRESS,
  VotingABI,
  wallet
);

export { 
    provider, 
    wallet, 
    BLOCKCHAIN_PRIVATE_KEY, 
    electionContract, 
    votingContract 
};
