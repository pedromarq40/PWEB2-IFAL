import express, {Request, Response} from 'express'
import crypto from 'crypto'

const app = express()
const PORT : number = 3000
const tarefas : Tarefa[] = []

class Tarefa {

    public id : string
    public titulo : string
    public texto : string
    public concluida : boolean 

    constructor(titulo : string, texto : string){
        this.titulo = titulo
        this.texto = texto
        this.id = crypto.randomUUID()
        this.concluida = false
    }
}

app.use(express.json())

app.get('/tarefas', (req : Request, res : Response) => {
    res.status(200).json(tarefas)
})

app.post('/tarefas', (req : Request, res : Response) => {

    const nova_tarefa : Tarefa = new Tarefa(req.body.titulo, req.body.texto)
    tarefas.push(nova_tarefa)

    const response : object = {
        mensagem : "Tarefa Criada com Sucesso!",
        tarefa : nova_tarefa
    }

    res.status(200).json(response)
})

app.delete('/tarefas/:id', (req : Request<{id : string}>, res : Response) => {

    const id : string = req.params.id
    const index : number = tarefas.findIndex( item => item.id === id)

    if ( index != -1){
        const response = {
            mensagem: "tarefa removida com sucesso!",
            id_removido: id
        }
        tarefas.splice(index, 1)
        res.status(200).json(response)
    } else {
        const response = {
            mensagem: "não foi encontrada uma tarefa com esse id!"
        }
        res.status(404).json(response)
    }
})

app.put("/tarefas/:id", (req : Request<{ id : string}>, res : Response) => {

    const id : string = req.params.id
    const index : number = tarefas.findIndex( item => item.id === id)
    const tarefa_alvo = tarefas[index]

    if (tarefa_alvo){

        tarefa_alvo.titulo = req.body.titulo
        tarefa_alvo.texto = req.body.texto

        const response : object = {
            mensagem : "Tarefa Substituída com Sucesso",
            nova_tarefa : tarefas[index]
        }
        res.status(200).json(response)
    } else {
        const response = {
            mensagem: "id não encontrado"
        }
        res.status(404).json(response)
    }
})

app.patch("/tarefas/:id", (req : Request<{id : string}>, res : Response) => {

    const id : string = req.params.id
    const index : number = tarefas.findIndex( item => item.id === id)
    const tarefa_alvo = tarefas[index]

    if (tarefa_alvo){
        tarefa_alvo.concluida = !tarefa_alvo.concluida

        const response : object = {
            mensagem : "Tarefa Substituída com Sucesso",
            tarefa : tarefa_alvo
        }
        res.status(200).json(response)
    } else {
        const response = {
            mensagem: "id não encontrado"
        }
        res.status(404).json(response)
    }
})

app.listen(PORT, () => {
    console.log(`Toma teu server ai chefia: $http://localhost:${PORT}`)
})