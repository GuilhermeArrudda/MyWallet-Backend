import express, { json } from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

const server = express();

server.use(json());
server.use(cors());

server.use(router);

server.listen(5000, () => {
    console.log('Running server in http://localhost:5000');
});
