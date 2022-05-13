import dotenv from 'dotenv';
dotenv.config()

import express from 'express';

import { useRoutes } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = process.env.PORT || 8991

const app = express();

app.use(bodyParser.json())
app.use(cors())

useRoutes(app);

app.listen(PORT, () =>{
    console.log(`Rodando na porta ${PORT}`);
})