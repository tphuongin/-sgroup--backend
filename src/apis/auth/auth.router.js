import express from 'express';
import ValidateUser from '../../middlewares/validateUser.middleware.js';

const router = express.Router();
const validateUser = new ValidateUser();

router.post('/register', validateUser.validateRegister);
router.post('/login', validateUser.validateLogin);

export default router;