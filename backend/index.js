import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config({
    path : ".env"
})

const PORT = process.env.PORT || 4000
const app= express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


mongoose.connect(process.env.MONGODB_CONN,{dbName:'gym-website'})
    .then(()=>console.log('Database connected'))
    .catch(err=>console.log(err))




    
app.listen(PORT,()=>{
    console.log('Server running on port:',PORT)
})