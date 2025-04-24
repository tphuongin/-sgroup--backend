// import UserModel from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    async register(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = { email, password: hashedPassword };
        const result = await this.userModel.createUser(newUser); 
        return result;
    }
    async login(email, password) {
        const user = await this.userModel.findUserByEmail(email); 
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Tạo token
        return token;
    }
}
export default new AuthService();