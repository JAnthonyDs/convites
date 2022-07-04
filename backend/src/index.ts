import express from 'express';
import { router } from './routes';
import cors from 'cors'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.use('/files',express.static(path.resolve(__dirname,'..','uploads')))

const PORT = process.env.PORT || 3333

app.listen(PORT, () =>{
    console.log(`Server rodando na porta ${PORT}`)
})