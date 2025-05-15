import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const SECRET_KEY = process.env.JWT_SECRET

class AuthProvider {
    async encodeToken(user){
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            SECRET_KEY,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN, 
                algorithm: 'HS256' 
            }
        );
        return token;
    }
    async decodeToken(token){
        return jwt.verify(token, SECRET_KEY)
    }
    async verifyResetToken(token, resetPassToken, tokenExpiration){ 
        if (Date.now() < tokenExpiration && token === resetPassToken) {
            return true;
        }
        return false;
    }
}

export default new AuthProvider();