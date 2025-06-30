
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import staffRoutes from './routes/Staff.route.js';
import MemberRoute from './routes/member.route.js'
import EquipmentRoutes from './routes/Equipment.route.js';
import adminRouter from './routes/Admin.route.js';

dotenv.config({
    path : ".env"
})



const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_CONN, { dbName: 'gym-website' })
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use('/api/members', MemberRoute)
app.use('/api/staff', staffRoutes); 
app.use('/api/equipment', EquipmentRoutes);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => { 
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
}
);