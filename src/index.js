import express, { json } from 'express';
import cors from 'cors';
import { postSignUp, postSignIn } from './controllers/userController.js';
import { getBankOperations } from './controllers/bankController.js';

const server = express();

server.use(json());
server.use(cors());

server.post('/sign-up', postSignUp);
server.post('/sign-in', postSignIn);

server.get('/homepage', getBankOperations);

server.listen(5000, () => {
    console.log('Running server in http://localhost:5000');
});
