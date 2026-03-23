import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const tarefas = []
let contador_id = 1

const __dirname = import.meta.dirname

app.use(express.urlencoded({extended : true})) //permite ler os forms html usados antes
app.use(express.static(path.join(__dirname, 'public'))) //apenas se for usar páginas html
app.use(express.json()) // responses em json

class Tarefa {

    constructor(titulo, texto){
        this.titulo = titulo
        this.texto = texto
        this.id = contador_id
        this.concluida = false
    }
}

app.get('/tarefa', (req, res) => {
    res.status(200).json(tarefas)
})

app.post("/tarefa", (req, res) => {
   
    const response = {
        mensagem: "tarefa criada com sucesso!",
        tarefas: new Tarefa(req.body.titulo, req.body.texto)
    }

    contador_id++ 
    tarefas.push(response.tarefas)
    res.status(201).json(response)
})

app.delete("/tarefa/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const index = tarefas.findIndex( item => item.id === id)

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

app.put("/tarefa/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const index = tarefas.findIndex( item => item.id === id)

    if ( index != -1){
        tarefas[index].titulo = req.body.titulo
        tarefas[index].texto = req.body.texto
        const response = {
            mensagem: "tarefa substituída com sucesso!",
            tarefa_nova : tarefas[index]
        }
        tarefas.splice(index, 1, response.tarefa_nova)
        res.status(200).json(response)
    }else{
        const response = {
            mensagem: "não foi encontrada uma tarefa com esse id!"
        }
        res.status(404).json(response)
    }
})

app.patch("/tarefa/:id", (req, res) => {

    const id = parseInt(req.params.id)
    const index = tarefas.findIndex( item => item.id === id)

    if(index != -1){
        const response = {
            mensagem: "status da tarefa modifcado com sucesso!",
            tarefa: tarefas[index]
        }
        tarefas[index].concluida = !tarefas[index].concluida
        res.status(200).json(response)

    }else{
        const response = {
            mensagem: "id não encontrado"
        }
        res.status(404).json(response)
    }
})

app.listen( PORT, () => {
    console.log(`Teu link ai mano: http://localhost:${PORT}`)
})
