import db from '../db.js'
import { validateSignUp } from '../validations/validations.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html'

async function postSignUp(req, res) {
    const personalData = req.body;
    console.log(personalData);
    if (validateSignUp(personalData)) {
        res.sendStatus(422);
        return;
    };

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
        const passwordHash = bcrypt.hashSync(personalData.password, 10)
        await personalDataCollection.insertOne({ ...personalData, password: passwordHash });
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};

export {
    postSignUp
};