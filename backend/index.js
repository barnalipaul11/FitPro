import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import MemberRoute from './routes/member.route.js'
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


app.use('/api/members', MemberRoute)

    
app.listen(PORT,()=>{
    console.log('Server running on port:',PORT)
})

app.use((err, req, res, next) => { 
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
}
);