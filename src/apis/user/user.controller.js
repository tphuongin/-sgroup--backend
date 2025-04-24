import * as userService from './user.service.js';

export async function registerUser(req, res) {
    try {
        const { email, password } = req.body;
        const newUser = await userService.register(email, password);
        res.status(201).json({ message: 'User registered successfully', id: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}