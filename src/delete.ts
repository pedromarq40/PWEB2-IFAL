import express from 'express'
import type {Request, Response} from 'express'
import prisma from './lib/prisma'

const router_delete = express.Router()
router_delete.use(express.json())

router_delete.delete('/tarefas/true', async (req : Request<{id : string}>, res : Response) => {

    try{
        const response = await prisma.tarefa.deleteMany({ where : { concluida : true } })
        res.status(200).json({"Tarefa deletada" : response})
    }catch{
        const response = { erro : "Tarefa não encontrada"}
        res.status(404).json(response)
    }
})

router_delete.delete('/tarefas/all', async (req : Request<{id : string}>, res : Response) => {

    try{
        const response = await prisma.tarefa.deleteMany({ where : { } })
        res.status(200).json({"Tarefa deletada" : response})
    }catch{
        const response = { erro : "Tarefa não encontrada"}
        res.status(404).json(response)
    }
})

router_delete.delete('/tarefas/:id', async (req : Request<{id : string}>, res : Response) => {
    
    const id = { where : { id: req.params.id } }

    try{
        const response = await prisma.tarefa.delete(id)
        res.status(200).json({"Tarefa deletada" : response})
    }catch{
        const response = { erro : "Tarefa não encontrada"}
        res.status(404).json(response)
    }
})

export default router_delete