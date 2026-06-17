import Joi from "joi";

/**
 * @desc    Generic validation middleware
 * @param   {Joi.ObjectSchema} schema - The Joi schema to validate against
 */
export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((err) => err.message),
        });
    }

    next();
};

export default validate;
