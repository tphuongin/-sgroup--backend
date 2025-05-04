import Joi from 'joi';
import UserModel from '../models/user.model.js';

export const validateRegister = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        }),
        name: Joi.string().min(3).required().messages({
            'string.min': 'Name must be at least 3 characters long',
            'any.required': 'Name is required'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if email already exists
    const existingUser = await UserModel.getUserByEmail(req.body.email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    next();
};