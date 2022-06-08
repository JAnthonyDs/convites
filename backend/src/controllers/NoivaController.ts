import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {Request, Response} from 'express'

const createUser = async (req: Request, res: Response) => {
    try {
        const { cpf, nome, descricao, tipo, foto } = req.body

        //let user = await prisma.noiva.findUnique({ where: {cpf}})
        
        const noiva = await prisma.noiva.create({
            data:{
                cpf,
                nome,
                descricao,
                tipo,
                foto
            },
        })

        return res.json(noiva);

    } catch (error) {
        return res.json({error})
    }
}

const getNoiva = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const noiva = await prisma.noiva.findUnique({ where: {id: Number(id)}})

        return res.json(noiva)


    } catch (error) {
        return res.json({error})
    }
}

export const NoivaController = {
    createUser,
    getNoiva
}