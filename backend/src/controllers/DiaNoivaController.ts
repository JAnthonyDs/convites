import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {Request, Response} from 'express'

const create = async (req: Request, res: Response) => {
    try {
        const {id_noiva, id_dia} = req.body

        await prisma.dia_noiva.create({
            data:{
                id_dia: id_dia,
                id_noiva: id_noiva
            }
        })

        return res.json({message: 'ok'})

    } catch (error) {
        return res.json(error);
    }
}

const find = async (req: Request, res: Response) => {
    try {
        
        const vari = await prisma.dia_noiva.findMany();
        
        return res.json(vari);

    } catch (error) {
        return res.json(error);
    }
}

export const DiaNoivaController ={
    create,
    find
}