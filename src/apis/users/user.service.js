import UserModel from '../../models/user.model.js';
import 'dotenv/config.js';

class UserService {
    async getMe(id){
        const user = await UserModel.getUserByID(id);
        if (!user) {
            throw new Error('User not found');
        }
        const result = {
            id: user._id,
            email: user.email,
            name: user.name,
        }
        return result;
    }
}

export default new UserService();