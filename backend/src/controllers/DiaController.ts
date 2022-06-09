import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {Request, Response} from 'express'

const createDia =async (req: Request, res: Response) => {
    try{
        const {dia,mes,ano} = req.body;

        const day = await prisma.dia.create({
            data:{
                dia,
                mes,
                ano
            }
        })

        return res.json(day)

    }catch(error){
        return res.json(error)
    }
}

const findDia =async (req: Request, res: Response) => {
    try{
        const {dia,mes,ano} = req.params
        const day = await prisma.dia.findMany({
            where: {dia: Number(dia), mes: Number(mes), ano: Number(ano)}
        })

        return res.json(day);


    }catch(error){
        return res.json(error)
    }
}

const findAllDia =async (req: Request, res: Response) => {
    try{
        
        const dia = await prisma.dia.findMany()

        return res.json(dia);


    }catch(error){
        return res.json(error)
    }
}


export const DiaController = {
    createDia,
    findDia,
    findAllDia
}