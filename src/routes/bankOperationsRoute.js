import { Router } from "express";
import { getBankOperations } from "../controllers/bankController.js";
import { validateTokenMiddleware } from "../middlewares/validateBankOperations.js";

const bankOperationsRouter = Router();

bankOperationsRouter.get('/homepage', validateTokenMiddleware, getBankOperations);

export{
    bankOperationsRouter
};