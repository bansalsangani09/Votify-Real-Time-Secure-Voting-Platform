import Joi from 'joi';

export const updateSettingsSchema = Joi.object({
    twoFactorAuthentication: Joi.boolean(),
    voterRegistrationUpdates: Joi.boolean(),
    maintenanceMode: Joi.boolean(),
    allowNewRegistrations: Joi.boolean(),
    requireEmailVerification: Joi.boolean(),
    sessionTimeout: Joi.number().integer().min(1)
});

export const transferOwnershipSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Target user email is required',
        'string.email': 'Please provide a valid email address'
    })
});

export default {
    updateSettingsSchema,
    transferOwnershipSchema
};
