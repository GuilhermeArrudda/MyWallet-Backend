import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/userController.js";
import { validateSignInSchemaMiddleware, validateSignUpSchemaMiddleware } from "../middlewares/validatePersonalDataSchemaMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', validateSignUpSchemaMiddleware, postSignUp);
userRouter.post('/sign-in', validateSignInSchemaMiddleware, postSignIn);

export {
    userRouter
};