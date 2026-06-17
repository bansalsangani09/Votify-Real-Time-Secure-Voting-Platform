import Joi from 'joi';

export const updateProfileSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    biography: Joi.string().allow('', null),
    location: Joi.string().allow('', null),
    phoneNumber: Joi.string().allow('', null)
});

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters long'
    })
});

export const updateVoterStatusSchema = Joi.object({
    status: Joi.string().valid('Active', 'Inactive', 'Suspended').required(),
    electionId: Joi.string().allow('', null)
});

export const updateNotificationsSchema = Joi.object({
    notifyNewElections: Joi.boolean(),
    notifyResultsReady: Joi.boolean(),
    notifyVoteConfirmations: Joi.boolean()
});

export const updateElectionNotificationSchema = Joi.object({
    enabled: Joi.boolean().required()
});

export const createVoterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const removeFromElectionSchema = Joi.object({
    electionId: Joi.string().required()
});

export default {
    updateProfileSchema,
    changePasswordSchema,
    updateVoterStatusSchema,
    updateNotificationsSchema,
    updateElectionNotificationSchema,
    createVoterSchema,
    removeFromElectionSchema
};
