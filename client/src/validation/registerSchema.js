import Joi from "joi";

const registerSchema = {

    firstName: Joi.string().min(3).max(15)
        .required()
        .messages({
            "string.empty": "Please provide first name",
            "string.min": "First name must be minimum 3 characters long",
            "string.max": "First name must be maximum 15 characters long",
        }),
    lastName: Joi.string().min(3).max(15)
        .required()
        .messages({
            "string.empty": "Please provide last name",
            "string.min": "Last name must be minimum 3 characters long",
            "string.max": "Last name must be maximum 15 characters long",
        }),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required()
        .messages({
            "string.empty": "Please provide e-mail",
            "string.email": "Invalid e-mail",
        }),
    password: Joi.string().min(3)
        .required()
        .messages({
            "string.empty": "Please provide password",
            "string.min": "Password lenght must be 8 characters long",
        }),
    confirmPassword: Joi.string()
        .required()
        .messages({
            "string.empty": "Please provide password",
        }),
};

export default registerSchema;
