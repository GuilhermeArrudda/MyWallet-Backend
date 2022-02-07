import db from "../db.js";

async function getBankOperations(req, res) {
    const session = res.locals.session;
    console.log(session)

    try {
        const bankOperationsCollection = db.collection('operations');
        const bankOperations = await bankOperationsCollection.find({ idPersonal: session.idPersonal }).toArray();
        
        if(!bankOperations){
            res.status(401).send("aqui");
            return;
        }

        res.status(201).send(bankOperations);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

async function postNewBankOperation(req, res) {
    const session = res.locals.session;
    const newOperation = req.body;
    console.log(session)

    try {
        
        await db.collection('operations').insertOne({ newOperation, idPersonal: session.idPersonal });

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send("aqui")
    }
};

export {
    getBankOperations,
    postNewBankOperation
};