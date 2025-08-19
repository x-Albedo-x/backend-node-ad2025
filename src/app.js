import express from 'express'
import dotenv from 'dotenv'
import router from './routes/empleado.routes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/empleados', router)
const PORT = process.env.PORT ||5050
app.listen(PORT, () => {
    console.log(`Servidor trabajando en ${PORT}`)
})
