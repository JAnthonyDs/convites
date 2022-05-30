import {Request, Response} from 'express'
import { badRequest, internalServerErro } from '../services/util';
import { diaModel } from '../models/dia';

const selectDia = (req: Request, res: Response) => {
    const dia = req.body;
    diaModel.selectDia(dia)
     .then(dia => {
        res.json(dia);
    })
    .catch(err =>{
        internalServerErro(res,err)
    })
}

const insertDia = (req: Request, res: Response) => {
    const dia = req.body;
    diaModel.insertDia(dia)
    .then(() => {
        res.json({
            'message': 'OK'
        })
    })
    .catch(err => {
        internalServerErro(res,err);
    })
}

const deleteDia = (req: Request, res: Response) =>{
    const dia = req.body;
    diaModel.deleteDia(dia)
    .then(() => {
        res.json({
            'message':'apagado'
        })
    })
    .catch(err => {
        internalServerErro(res,err);
    })
}

const showDia = (req: Request, res: Response) => {
    diaModel.showDia()
    .then(dia => {
        res.json(dia)
    })
    .catch(err => {
        internalServerErro(res,err)
    })
}

export const diaController = {
    selectDia,
    insertDia,
    deleteDia,
    showDia
}