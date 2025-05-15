import authService from "./auth.service.js";
// import authProvider from '../../providers/auth.provider.js';

class AuthController {
    async register(req, res) {
        try {
            const { email, password, name } = req.body;
            const result = await authService.register(email, password, name);
            res.status(201).json({ message: 'User registered successfully', userId: result });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    async forgotPassword(req,res){
        try{
            const email = req.body.email;
            await authService.forgotPassword(email);
            res.status(200).json({ message: 'Password reset email sent' });
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }
    async resetPassword(req,res){
        try{
            const { email, token, newPassword } = req.body;
            const result = await authService.resetPassword(email, token, newPassword);
            res.status(200).json({ result });
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }

}

export default new AuthController();