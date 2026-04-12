import express from 'express'
import router_get from './get'
import router_post from './post'
import router_delete from './delete'
import router_put_patch from './put_patch'

const app = express()
const PORT : number = 3000

app.use(express.json())
app.use('', router_get)
app.use('', router_post)
app.use('', router_delete)
app.use('', router_put_patch)

app.listen(PORT, () => {
    console.log(`Toma teu server ai meu nobre: http://localhost:${PORT}`)
})


