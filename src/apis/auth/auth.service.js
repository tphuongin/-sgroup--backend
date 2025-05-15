import UserModel from '../../models/user.model.js';
import authProvider from '../../providers/auth.provider.js';
import hashProvider from '../../providers/hash.provider.js';
import emailProvider from '../../providers/email.provider.js';
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

    async forgotPassword(email) {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const token = await authProvider.encodeToken(user);
        const tokenExpiration = Date.now() + 3*10*10000; // 3 minutes
        await UserModel.saveResetPassToken(email, token, tokenExpiration);
        emailProvider.sendEmail(
            email,
            'Password Reset',
            `Here is you reset password token: ${token}`
        );
        return token;
    }
    async resetPassword(email, token, newPassword) {
        const user = await UserModel.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isTokenValid = await authProvider.verifyResetToken(token, user.resetPassToken, user.tokenExpiration);
        if (!isTokenValid) {
            throw new Error('Invalid or expired token');
        }
        const hashedPassword = await hashProvider.generateHash(newPassword);

        await UserModel.updateUser(user._id, { password: hashedPassword });
        await UserModel.saveResetPassToken(email, null, null); 
        
        return 'Password reset successfully';
    }

}

export default new AuthService();