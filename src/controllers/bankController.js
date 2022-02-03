import db from "../db.js";

async function getBankOperations(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    const sessionCollection = db.collection('session');
    try {
        
        const session = await sessionCollection.findOne({ token });
        if(!session) {
            res.sendStatus(401);
            return;
        };
        const bankOperationsCollection = db.collection('operations');
        const bankOperations = await bankOperationsCollection.find({}).toArray();
        res.send(bankOperations);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export {
    getBankOperations
};