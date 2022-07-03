import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import {Request, Response} from 'express'

const createUser = async (req: Request, res: Response) => {
    try {
        const { cpf, nome, descricao, tipo, foto,dia,mes,ano } = req.body

        let noiva_veri = await prisma.noiva.findUnique({ where: {cpf}})

        //const id = noiva_veri?.id
        const day = await prisma.dia.findMany({
            where: {dia: Number(dia), mes: Number(mes), ano: Number(ano)}
        })

        let dia_id = day[0].id
        
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
                dia:{
                    create:{
                        dia_id:{
                            connect:{ id: dia_id}
                        }
                    }
                }
                
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
        const {id_day} = req.params

        const deleteRelation = await prisma.dia_noiva.deleteMany({
            where:{
                id_noiva: Number(id),
                dia_id: {
                    id: Number(id_day)
                }
            }
        })
        const noiva = await prisma.noiva.delete({ where: {id: Number(id)}})

        return res.json(deleteRelation);

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