import express from 'express';
import { singUp, login, logout } from '../controllers/Admin.controller.js';

const adminRouter = express.Router();

adminRouter.post('/signup', singUp);
adminRouter.post('/login', login);
adminRouter.get('/logout', logout);

export default adminRouter;