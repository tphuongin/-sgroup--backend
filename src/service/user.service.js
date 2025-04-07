import { readDataFile, writeDataFile } from '../database/mockDatabase.js'
import path from 'path'
import { fileURLToPath } from 'url'

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const dataFile = path.resolve(dirName, '../database/data.json')

export function addUser(userInfor) {
    const users = readDataFile(dataFile);
    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...userInfor };
    users.push(newUser);
    writeDataFile(dataFile,users);
    return newUser;
}

export function updateUser(userId, updateData) {
    const users = readDataFile(dataFile);
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
        users[index] = { ...users[index], ...updateData };
        writeDataFile(dataFile,users);
        return users[index];
    }
    return null;
}

export function deleteUser(userId) {
    const users = readDataFile(dataFile);
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
        users.splice(index, 1);
        writeDataFile(dataFile,users);
        return true;
    }
    return false;
}

export function getUserById(userId) {
    const users = readDataFile(dataFile);
    return users.find(u => u.id === userId);
}

export function getAllUsers() {
    return readDataFile(dataFile);
}