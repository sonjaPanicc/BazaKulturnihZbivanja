import Joi from "joi";

const loginSchema = {

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
};

export default loginSchema;
