import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const tarefas = []
const usuarios = {}

const __dirname = import.meta.dirname

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

//Lógica das tarefas
app.get('/tarefa', (req, res) => {
    const caminho = path.join( __dirname, 'public', 'tarefa.html')
    res.sendFile(caminho)
})

app.post("/submit", (req, res) => {
    const obj = {
        tarefa: req.body.tarefa,
        email: req.body.email
    }
    console.table(obj)
    tarefas.push(obj)
    res.redirect('/tarefa')
})

//Lógica do cadastro
app.get('/cadastro', (req, res) => {
    const caminho = path.join( __dirname, 'public', 'cadastro.html')
    res.sendFile(caminho)
})

app.post("/cadastro", (req, res) => {

    if ( Object.keys(usuarios).includes(req.body.email)) {
        console.log('Já há um cadastro com esse email!')
        return res.redirect('/cadastro')
    } 

    const user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }

    usuarios[user.email] = user
    console.log('Usuário Cadastrado!')
    console.table(usuarios)
    res.redirect("/")
})

//Lógica do Login
app.get('/', (req, res) => {
    const caminho = path.join( __dirname, 'public', 'login.html')
    res.sendFile(caminho)
})

app.post("/login", (req, res) => {

    const user = {
        email: req.body.email,
        senha: req.body.senha
    }

    if (!(Object.keys(usuarios).includes(user.email))){
        console.log('Não há usuário cadastrado com esse email!')
    }

    if ((usuarios[user.email].senha == user.senha)) {
        console.log('Login Concluido')
        return res.redirect('/tarefa')
    }
})

app.listen( PORT, () => {
    console.log(`Teu link ai mano: http://localhost:${PORT}`)
})