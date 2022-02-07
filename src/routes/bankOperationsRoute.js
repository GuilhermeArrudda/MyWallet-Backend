import { Router } from "express";
import { getBankOperations, postNewBankOperation } from "../controllers/bankController.js";
import { validateBankOperationMiddleware, validateTokenMiddleware } from "../middlewares/validateBankOperations.js";

const bankOperationsRouter = Router();

bankOperationsRouter.get('/homepage', validateTokenMiddleware, getBankOperations);
bankOperationsRouter.post('/homepage', validateTokenMiddleware, validateBankOperationMiddleware, postNewBankOperation);

export{
    bankOperationsRouter
};