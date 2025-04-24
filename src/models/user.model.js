import { getDB } from '../config/db.config.js';

class UserModel {
    async createUser(user) {
        const result = await getDB().collection('users').insertOne(user);
        return result.insertedId;
    }
}
export default new UserModel();