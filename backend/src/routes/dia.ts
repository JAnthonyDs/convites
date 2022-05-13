import {Router} from 'express';
import { diaController } from '../controllers/dia';

const diaRouter = Router();
diaRouter.post('/',diaController.selectDia);
diaRouter.post('/insert',diaController.insertDia)
diaRouter.delete('/delete', diaController.deleteDia)

export {diaRouter};