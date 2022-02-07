import db from "../db.js"

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

export {
    validateTokenMiddleware
}