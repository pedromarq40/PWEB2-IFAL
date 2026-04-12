import express from 'express'
import type {Request, Response} from 'express'
import prisma from './lib/prisma'

const router_get = express.Router()
router_get.use(express.json())

router_get.get('/tarefas', async (req : Request, res : Response) => {
    try{
        const response = await prisma.tarefa.findMany()
        res.status(200).json(response)
    }catch{
        const response = { "resposta" : "Erro ao buscar tarefas"}
        res.status(404).json(response)
    }
})

router_get.get('/tarefas/primeira', async (req : Request, res : Response) => {
    try{
        const response = await prisma.tarefa.findFirst({
            orderBy : { criadoEm : 'desc'}
        })
        res.status(200).json(response)
    }catch{
        const response = { "resposta" : "Erro ao buscar tarefas"}
        res.status(404).json(response)
    }
})

router_get.get('/tarefas/true', async ( req : Request, res : Response ) => {
    try{
        const response = await prisma.tarefa.findMany({ where : { concluida : true}})
        res.status(200).json(response)
    }catch{
        const response = { mensagem : "Tarefa não encontrada"}
        res.status(404).json(response)
    }
})

router_get.get('/tarefas/false', async ( req : Request, res : Response ) => {
    try{
        const response = await prisma.tarefa.findMany({ where : { concluida : false}})
        res.status(200).json(response)
    }catch{
        const response = { mensagem : "Tarefa não encontrada"}
        res.status(404).json(response)
    }
})

router_get.get('/tarefas/:id', async (req : Request<{ id : string}>, res : Response) => {
    
    const id = req.params.id
    
    try{
        const response = await prisma.tarefa.findUnique({ where : { id : id }})
        res.status(200).json(response)
    }catch{
        const response = { mensagem : "Tarefa não encontrada! "}
        res.status(404).json(response)
    }
})

export default router_get