import express from "express"
import cors from "cors"
import getData from "./controllers/getData.js"
import postData from "./controllers/postData.js"
import { join } from "node:path"

const PORT = 3000
const dataPath = join(import.meta.dirname, 'data')
const app = express()

//MIDDLEWARES
app.use(cors( { origin: 'https://invoice-flow-eight-rho.vercel.app/', methods: ['GET', 'POST', 'PUT', 'DELETE'] } ))
app.use(express.json())

//ROUTES
app.get('/api/:data', (req, res) => getData(req, res, dataPath))
app.post('/api/:data', (req, res) => postData(req, res, dataPath))

app.listen(PORT, ()=> console.log(PORT))