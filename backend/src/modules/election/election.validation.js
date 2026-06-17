import Joi from 'joi';

export const createElectionSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    candidates: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().allow('', null),
        photoUrl: Joi.string().allow('', null),
        partyName: Joi.string().allow('', null),
        email: Joi.string().email().allow('', null)
    })).min(2).required(),
    startDate: Joi.string().required(),
    startTime: Joi.string().required(),
    endDate: Joi.string().required(),
    endTime: Joi.string().required(),
    votingType: Joi.string().valid('Single Choice', 'Multiple Choice', 'Ranked Voting').required(),
    maxVotes: Joi.number().integer().min(1).default(1),
    anonymous: Joi.boolean().default(false),
    autoActivate: Joi.boolean().default(true),
    autoClose: Joi.boolean().default(true),
    allowLiveResults: Joi.boolean().default(true),
    liveResultsEnabled: Joi.boolean().default(true),
    publicResultsVisible: Joi.boolean().default(false),
    resultTime: Joi.string().allow('', null),
    captchaToken: Joi.string().allow('', null) // Often checked in middleware but good to have in schema
});

export const updateElectionSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    startDate: Joi.string(),
    startTime: Joi.string(),
    endDate: Joi.string(),
    endTime: Joi.string(),
    votingType: Joi.string().valid('Single Choice', 'Multiple Choice', 'Ranked Voting'),
    maxVotes: Joi.number().integer().min(1),
    anonymous: Joi.boolean(),
    autoActivate: Joi.boolean(),
    autoClose: Joi.boolean(),
    allowLiveResults: Joi.boolean(),
    liveResultsEnabled: Joi.boolean(),
    publicResultsVisible: Joi.boolean(),
    resultTime: Joi.string().allow('', null),
    status: Joi.string().valid('active', 'paused', 'closed', 'draft', 'scheduled')
});

export const joinElectionSchema = Joi.object({
    joinCode: Joi.string().required().messages({
        'any.required': 'Join code is required'
    })
});

export const addAdminSchema = Joi.object({
    email: Joi.string().email().required()
});

export const inviteVoterSchema = Joi.object({
    email: Joi.string().email().required()
});

export const candidateSchema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().allow('', null),
    position: Joi.string().allow('', null),
    email: Joi.string().email().allow('', null),
    partyName: Joi.string().allow('', null),
    photoUrl: Joi.string().allow('', null)
});

export default {
    createElectionSchema,
    updateElectionSchema,
    joinElectionSchema,
    addAdminSchema,
    inviteVoterSchema,
    candidateSchema
};
