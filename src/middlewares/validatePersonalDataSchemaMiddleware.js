import { signInSchema, singUpSchema } from "../validations/personalDataSchema.js";

function validateSignUpSchemaMiddleware(req, res, next) {
    const personalData = req.body;
    const validation = singUpSchema.validate(personalData);

    if(validation.error) {
        return res.sendStatus(422);
    };
    next();
};

function validateSignInSchemaMiddleware(req, res, next) {
    const personalData = req.body;
    const validation = signInSchema.validate(personalData);

    if(validation.error) {
        return res.sendStatus(422);
    };
    next();
};

export {
    validateSignUpSchemaMiddleware,
    validateSignInSchemaMiddleware
}