import db from "../db.js";

async function getBankOperations(req, res) {
    const session = res.locals.session;

    try {
        const bankOperationsCollection = db.collection('operations');
        const bankOperations = await bankOperationsCollection.find({ userID: session.userID }).toArray();
        
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

export {
    getBankOperations
};