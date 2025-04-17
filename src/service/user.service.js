import { getDB } from '../config/db.config.js';

export async function createUser(name, age) {
    const result = await getDB().collection('users').insertOne({ name, age });
    return result.insertedId;
}

export async function updateUser(userId, updateData) {
    const result = await getDB().collection('users').findOneAndUpdate(
        { _id: userId },
        { $set: updateData },
        { returnDocument: 'after' } 
    );
    return result; 
}

export async function deleteUser(userId) {
    const result = await getDB().collection('users').deleteOne({ _id: userId });
    return result; 
}

export async function getUserById(userId) {
    const user = await getDB().collection('users').findOne({ _id: userId });
    return user; 
}

export async function getAllUsers() {
    const users = await getDB().collection('users').find().toArray();
    return users;
}
