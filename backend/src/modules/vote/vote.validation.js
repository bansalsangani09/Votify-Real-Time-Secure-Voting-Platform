import Joi from "joi";

/**
 * @desc    Validation schema for casting a vote
 */
export const voteSchema = Joi.object({
    electionId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Invalid Election ID format',
        'string.empty': 'Election ID is required',
        'any.required': 'Election ID is required'
    }),
    candidateId: Joi.number().integer().min(0).optional(),
    rankedCandidateIds: Joi.array().items(Joi.number().integer().min(0)).optional(),
    selectedCandidateIds: Joi.array().items(Joi.number().integer().min(0)).optional(),
    captchaToken: Joi.string().required().messages({
        'string.empty': 'Security CAPTCHA is required',
        'any.required': 'Security CAPTCHA is required'
    }),
}).or('candidateId', 'rankedCandidateIds', 'selectedCandidateIds').messages({
    'object.missingVariant': 'At least one candidate selection (single, ranked, or multiple choice) is required'
});

export default {
    voteSchema
};
