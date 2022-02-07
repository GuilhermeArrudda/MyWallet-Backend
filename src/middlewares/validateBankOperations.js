import db from "../db.js"
import { bankOperationsSchema } from "../validations/bankOperationsSchema.js"

async function validateTokenMiddleware(req, res, next){
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        res.status(401).send("Token inválido")
    };

    const sessionCollection = db.collection('session');
    const session = await sessionCollection.findOne({ token });
    
    if(!session) {
        res.status(401).send("aqui");
        return;
    };

    res.locals.session = session;
    next();
};

async function validateBankOperationMiddleware(req, res, next){
    const validation = bankOperationsSchema.validate(req.body);
    if(validation.error) {
        res.status(422).send("Dados inválidos")
        return;
    };
    next();
};

export {
    validateTokenMiddleware,
    validateBankOperationMiddleware
}