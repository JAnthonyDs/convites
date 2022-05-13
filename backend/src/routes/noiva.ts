import {Router} from 'express';
import { noivaController } from '../controllers/noiva';

const noivaRouter = Router();
noivaRouter.post('/', noivaController.insertNoiva);
noivaRouter.delete('/delete', noivaController.deleteNoiva);
noivaRouter.post('/select',noivaController.selectNoiva);
noivaRouter.put('/update', noivaController.updateNoiva)

export {noivaRouter};