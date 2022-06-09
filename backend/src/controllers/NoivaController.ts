import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {Request, Response} from 'express'

const createUser = async (req: Request, res: Response) => {
    try {
        const { cpf, nome, descricao, tipo, foto,dia,mes,ano } = req.body

        let noiva_veri = await prisma.noiva.findUnique({ where: {cpf}})
        //const id = noiva_veri?.id
        
        if(noiva_veri){
            
            return res.json({message:"Noiva ja cadastrada"})
        }

        const noiva = await prisma.noiva.create({
            data:{
                cpf,
                nome,
                descricao,
                tipo,
                foto,
                
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

const getAllNoiva = async(req: Request, res: Response) => {
    try{
        const noiva = await prisma.noiva.findMany()

        return res.json(noiva)

    }catch(error){
        return res.json(error)
    }
}

const updateNoiva = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const {cpf, nome, descricao,tipo,foto} = req.body;

        const noiva = await prisma.noiva.update({
            where: {id: Number(id)},
            data: {cpf,nome,descricao,tipo,foto}
        })

        return res.json(noiva);

    }catch(error){
        return res.json(error)
    }   
}

const deleteNoiva =async (req: Request, res: Response) => {
    try{
        const {id} = req.params

        const noiva = await prisma.noiva.delete({ where: {id: Number(id)}})

        return res.json({message:"Noiva deletada"});

    }catch(error){
        return res.json(error)
    }
}

export const NoivaController = {
    createUser,
    getNoiva,
    getAllNoiva,
    updateNoiva,
    deleteNoiva
}