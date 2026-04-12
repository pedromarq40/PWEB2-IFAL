import express from 'express'
import type {Request, Response} from 'express'
import prisma from './lib/prisma'

const router_put_patch = express.Router()
router_put_patch.use(express.json())

router_put_patch.put('/tarefas/:id', async ( req : Request<{ id : string }> , res : Response ) => {
    try{
        const nova_tarefa = {
            titulo : req.body.titulo,
            texto : req.body.texto
        }
        const response = await prisma.tarefa.update({ data : nova_tarefa, where : { id : req.params.id }})
        res.status(200).json(response)
    }catch{
        const response = { mensagem : "Tarefa não encontrada" }
        res.status(404).json(response)
    }
})

router_put_patch.patch('/tarefas/:id', async ( req : Request<{ id : string}>, res : Response ) => {
    try{
        const tarefa_atual = await prisma.tarefa.findUnique({where : { id : req.params.id }})

        if (!tarefa_atual){
            res.status(404).json({ mensagem : "Tarefa não encontrada"})
            return 
        }

        const response = await prisma.tarefa.update({
            where : { id : req.params.id },
            data : { concluida : !tarefa_atual.concluida }
        })
        res.status(201).json(response)
    }catch{
        const response = { mensagem : "Tarefa não encontrada! "}
        res.status(404).json(response)
    }
})

export default router_put_patch