import db from '../db.js'
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html'

async function postSignUp(req, res) {
    const personalData = req.body;
    const passwordHash = bcrypt.hashSync(personalData.password, 10)

    personalData.name = stripHtml(personalData.name).result.trim();
    personalData.email = stripHtml(personalData.email).result.trim();
    personalData.password = stripHtml(personalData.password).result.trim();

    const personalDataCollection = db.collection("users");

    try {
        
        const existingPersonalData = await personalDataCollection.findOne({ email: personalData.email });
        if(existingPersonalData){
            res.status(409).send("Dados de usuário já existentes, caso não lembre a senha entre em contato!");
            return;
        };
        await personalDataCollection.insertOne({ ...personalData, password: passwordHash });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

async function postSignIn(req, res) {
    const personalData = req.body;

    const personalDataCollection = db.collection("users");

    try {
        
        const existingPersonalData = await personalDataCollection.findOne({ email: personalData.email });

        if(!existingPersonalData) {
            res.sendStatus(401);
            return;
        };

        if(bcrypt.compareSync(personalData.password, existingPersonalData.password)) {
            const token = uuid();
            await db.collection('session').insertOne({ token, idPersonal: existingPersonalData._id })
            res.status(201).send({ name: existingPersonalData.name, token });
            return;
        };
        
        res.sendStatus(401);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export {
    postSignUp,
    postSignIn
};