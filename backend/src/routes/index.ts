import { Application, Router } from "express";
import { noivaRouter } from "./noiva";
import { loginRouter } from './login';
import { diaRouter } from "./dia";

import { storage } from '../config/multer';
import multer from 'multer';

const upload = multer({storage: storage})

import express from "express";
import path from "path";

export const useRoutes = (app: Application) => {
 const apiRouter = Router();
 apiRouter.use('/noiva', noivaRouter);
 apiRouter.use('/login', loginRouter);
 apiRouter.use('/dia', diaRouter);

 apiRouter.use('/files', express.static(path.resolve(__dirname,"..","..","uploads")))

 apiRouter.post('/uploads',upload.single('file'), (req,res) => {
     return res.json(req.file?.filename);
 })
 
 
 app.use('/api/v1', apiRouter);
}