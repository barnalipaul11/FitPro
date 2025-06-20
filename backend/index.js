import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import staffRoutes from './routes/Staff.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/api/staff", staffRoutes); 

mongoose.connect(process.env.MONGODB_CONN, { dbName: 'gym-website' })
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
