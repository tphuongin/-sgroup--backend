import authService from './auth.service.js';

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.status(200).json({ token });
        } catch (err) {
            next(err); 
        }
    }

    async register(req, res) {
        try {
            const { email, password } = req.body;
            const newUser = await authService.register(email, password);
            res.status(201).json({ message: 'User registered successfully', id: newUser });
        } catch (err) {
            if (err.message === 'User already exists') {
                res.status(409).json({ error: 'User already exists' });
            } else {
                res.status(500).json({ error: err.message });
            }
        }
    }
}

export default new AuthController();