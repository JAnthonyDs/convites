import {Request, Response} from 'express'
import { Login, loginModel } from '../models/login';
import { badRequest, internalServerErro } from '../services/util';

const verifica = (req: Request, res: Response) => {
    const login = req.body as Login
    loginModel.verifica(login)
    .then(login => {
        res.json({
            "message":"Bem vindo"
        })
    })
    .catch(err => {
        internalServerErro(res,err)
    })

}


const cadastra = (req: Request, res: Response) => {
    const login = req.body as Login
    loginModel.cadastra(login)
    .then(() => {
        res.json({
            'message':'cadastrado com sucesso(user)'
        })
    })
    .catch(err => {
        internalServerErro(res,err)
    })
}

export const loginController = {
    verifica,
    cadastra
}