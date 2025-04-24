import bcrypt from 'bcrypt';
import UserModel from '../../models/user.model.js';
export async function register(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = { email, password: hashedPassword };
    const result = await UserModel.createUser(newUser); 
    return result;
}