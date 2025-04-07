import * as userService from '../service/user.service.js'

export function getAllUsers(req, res) {
    try {
        const users = userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function getUserById(req, res) {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const user = userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function addUser(req, res) {
    try {
        const userInfor = req.body;
        if (!userInfor.name || !userInfor.age) {
            return res.status(400).json({ error: 'Name and age are required' });
        }
        const newUser = userService.addUser(userInfor);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function updateUser(req, res) {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const updateData = req.body;
        const updatedUser = userService.updateUser(userId, updateData);

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export function deleteUser(req, res) {
    try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const success = userService.deleteUser(userId);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}