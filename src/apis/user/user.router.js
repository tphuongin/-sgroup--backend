import express from 'express';
import * as userController from './user.controller.js';
import ValidateUser from '../../middlewares/validateUser.middleware.js';

const router = express.Router();
const validateUser = new ValidateUser();

router.post('/register', validateUser.validateRegister, userController.registerUser);

export default router;