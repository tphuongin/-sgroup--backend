import userService from "./user.service.js";
class UserController{
    async getMe(req,res){
        try{
            const userId = req.user.userId;
            const user = await userService.getMe(userId);
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}
export default new UserController();