import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { sequelize } from '../config/database'
import budgetRoute from './budgetRoute'
import authRoute from './authRoute'


const app = express()

app.use(morgan('dev'))

app.use(express.json())


const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexión establecida con la base de datos'.cyan)
        sequelize.sync()
    } catch (error) {
        console.log('Error: ', error)
    }
}
connectDB()

app.get('/', (req, res) => { res.send('Hello from the server') })
app.use('/budgets', budgetRoute)
app.use('/auth', authRoute)

export default app