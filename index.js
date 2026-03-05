import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const pessoas = []

const __dirname = import.meta.dirname

app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    const caminho = path.join( __dirname, 'public', 'home.html')
    res.sendFile(caminho)
})

app.get('/form', (req, res) => {
    const caminho = path.join( __dirname, 'public', 'form.html')
    res.sendFile(caminho)
})

app.post("/submit", (req, res) => {
    const obj = {
        nome: req.body.nome,
        email: req.body.email
    }
    console.table(obj)
    pessoas.push(obj)
    res.redirect('/')
})

app.listen( PORT, () => {
    console.log(`Teu link ai mano: http://localhost:${PORT}`)
})