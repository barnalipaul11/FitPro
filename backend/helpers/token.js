import jwt from 'jsonwebtoken';

const gentoken = async (adminId) => {
    try {
         const token = await jwt.sign(
        {
            id: adminId,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
        
    }
   
}

export default gentoken;