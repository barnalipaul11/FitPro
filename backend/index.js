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
app.get('/', (req, res) => {
    res.send('Hello from backend')
})