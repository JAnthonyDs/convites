import {Router} from 'express';
import { loginController } from '../controllers/login';

const loginRouter = Router();
loginRouter.post('/', loginController.verifica)
loginRouter.post('/cadastro', loginController.cadastra)

export {loginRouter}