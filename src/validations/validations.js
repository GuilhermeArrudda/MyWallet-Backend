import joi from 'joi';

function validateSignUp(personalData) {
    const singUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    });
    return !!singUpSchema.validate(personalData).error;
};

export {
    validateSignUp
};