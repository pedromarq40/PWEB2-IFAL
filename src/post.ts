import express from 'express'
import type {Request, Response} from 'express'
import prisma from './lib/prisma'

const router_post = express.Router()
router_post.use(express.json())

router_post.post('/tarefas', async (req : Request, res : Response) => {

    try{
        const tarefa = {
        "titulo" : req.body.titulo,
        "texto" : req.body.texto
        }
        const response = await prisma.tarefa.create({ "data" : tarefa})
        res.status(201).json(response)
    }catch{
        const response = { "resposta" : "Falha ao criar tarefa"}
        res.status(500).json(response)
    }
})

export default router_post