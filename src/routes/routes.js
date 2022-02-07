import { Router } from "express";
import { bankOperationsRouter } from "./bankOperationsRoute.js";
import { userRouter } from "./userRoute.js";

const router = Router();

router.use(userRouter);
router.use(bankOperationsRouter)

export {
    router
};