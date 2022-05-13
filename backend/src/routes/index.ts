import { Application, Router } from "express";
import { noivaRouter } from "./noiva";
import { loginRouter } from './login';
import { diaRouter } from "./dia";

export const useRoutes = (app: Application) => {
 const apiRouter = Router();
 apiRouter.use('/noiva', noivaRouter);
 apiRouter.use('/login', loginRouter);
 apiRouter.use('/dia', diaRouter);
 
 app.use('/api/v1', apiRouter);
}