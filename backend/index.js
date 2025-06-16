import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/dbConnection.js'

dotenv.config({path: './.env'})
const app = express()
const PORT = process.env.PORT

app.use(cors('*'))
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())

connectDB()
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

import userRouter from './Routes/user.routes.js'
import accountRouter from './Routes/account.routes.js'

app.use("/api/v1/user",userRouter)
app.use("/api/v1/account/", accountRouter)



