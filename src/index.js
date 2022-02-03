import express, { json } from 'express';
import cors from 'cors';
import { postSignUp } from './controllers/userController.js';

const server = express();

server.use(json());
server.use(cors());

server.post('/sign-up', postSignUp);

server.listen(5000, () => {
    console.log('Running server in http://localhost:5000');
});
