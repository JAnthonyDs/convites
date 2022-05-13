import {Request, Response} from 'express'
import { badRequest, internalServerErro } from '../services/util';
import { Noiva, noivaModel } from '../models/noiva';

const insertNoiva = (req: Request, res: Response) =>{
    {
        const noiva = req.body;
        if(!noiva){
            badRequest(res, "inválido");
        }
        if(!noiva.cpf){
            badRequest(res,"informe o cpf da noiva")
        }
        if(!noiva.nome){
            badRequest(res,"informe o nome da noiva")
        }
        if(!noiva.descricao){
            badRequest(res,"informe a descricao da noiva")
        }
    }

    const noiva = req.body as Noiva;
    noivaModel.insertNoiva(noiva)
     .then(cpf => {
         res.json({
             "noiva cadastrada com sucesso":cpf
         })
     })
     .catch(err =>{
         internalServerErro(res,err)
     })
    
}

const deleteNoiva = (req: Request, res: Response) => {
    const noiva = req.body as Noiva;
    const cpf_noiva = req.body.cpf;
    noivaModel.deleteNoiva(noiva)
    .then(() => {
        res.json({
            "message":'noiva deletada'
        })
    })
    .catch(err => {
        internalServerErro(res,err)
    })
}

const selectNoiva = (req: Request, res: Response) => {
    const cpf_noiva = req.body as Noiva;
    noivaModel.selectNoiva(cpf_noiva)
    .then(noiva => {
        res.json(noiva)
    })
    .catch(err => {
        internalServerErro(res,err)
    })
}

const updateNoiva = (req: Request, res: Response) => {
    const noiva = req.body;
    noivaModel.updateNoiva(noiva,noiva.cpf_antigo)
    .then(() => {
        res.json({
            "message":"ok"
        })
    })
    .catch(err => {
        internalServerErro(res,err)
    })
}

export const noivaController = {
    insertNoiva,
    deleteNoiva,
    selectNoiva,
    updateNoiva
}