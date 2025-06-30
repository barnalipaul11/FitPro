import Admin from '../models/Admin.model.js';
import bcrypt from 'bcryptjs';
import {handleError} from '../helpers/handleError.js';
import gentoken from '../helpers/token.js';

export const singUp = async (req, res) => {
	try{
        const { name,email, password } = req.body;
        const existEmail = await Admin.findOne({ email });
        if (existEmail) {
            return handleError(res, 400, 'Email already exists');
        }

        if(password.length < 6) {
            return handleError(res, 400, 'Password must be at least 6 characters');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });
        const token = await gentoken(newAdmin._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        });
        return res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            admin: {
                _id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
        });
    }catch (error) {
        return handleError(res, 500, 'SignUp error');
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return handleError(res, 404, 'Admin not found');
        }
        console.log(admin);
        
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(isMatch);
        
        if (!isMatch) {
            console.log('Invalid credentials');
            
            return handleError(res, 400, 'Invalid credentials');
        }

        const token = await gentoken(admin._id);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({
            success: true,
            token,
            message: 'Login successful',
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        return handleError(res, 500, 'Login error');
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        return handleError(res, 500, 'Logout error');
    }
}