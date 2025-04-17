import * as userService from '../service/user.service.js'
import { ObjectId } from 'mongodb';

export async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getUserById(req, res) {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await userService.getUserById(userId); 
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createUser(req, res) {
    try {
        const userInfor = req.body;
        const newUser = await userService.createUser(userInfor.name, userInfor.age);
        res.status(201).json({ id: newUser }); 
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUser(req, res) {
    try {
        const userId = new ObjectId(req.params.id);
        const updateData = req.body;
        const updatedUser = await userService.updateUser(userId, updateData); 
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteUser(req, res) {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await userService.deleteUser(userId); 
        if (result.deletedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function hello(req, res){
    res.render('index.ejs', {
        name: 'tp',
        age: 19,
    });
}
