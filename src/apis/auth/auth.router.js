import express from 'express';
import { validateRegister } from '../../middlewares/user.middleware.js';
import AuthController from './auth.controller.js';
const router = express.Router();

router
    .post('/login', AuthController.login)
    .post('/register', validateRegister, AuthController.register)

export default router;