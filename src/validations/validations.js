import joi from 'joi';

function validateSignUp(personalData) {
    const singUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return !!singUpSchema.validate(personalData).error;
};

function validateSignIn(personalData) {
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    return !!signInSchema.validate(personalData).error;
};

export {
    validateSignUp,
    validateSignIn
};