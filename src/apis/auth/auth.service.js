import UserModel from '../../models/user.model.js';
import authProvider from '../../providers/auth.provider.js';
import hashProvider from '../../providers/hash.provider.js';
import 'dotenv/config.js';

class AuthService {
    async register(email, password, name) {
        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await hashProvider.generateHash(password);
        return await UserModel.createUser( email, hashedPassword, name );
    }

    async login(email, password) {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await hashProvider.compareHash(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = await authProvider.encodeToken(user);
        return token;
    }

}

export default new AuthService();