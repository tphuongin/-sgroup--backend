import { ObjectId } from "mongodb";
import { getDB } from "../config/db.config.js"

class UserModel{
    async createUser(email, password, name, token){
        const user = await getDB().collection("users").insertOne({
            email,
            password,
            name,
            token
        });
        return user;
    }
    
    async getUser(){
        const users = await getDB().collection("users").find().toArray();
        return users;
    }
    async getUserByID(id){

        const user = await getDB().collection("users").findOne({_id: new ObjectId(String(id))});
        return user;
    }
    async getUserByEmail(email){
        const user = await getDB().collection("users").findOne({email: email});
        return user;
    }
}

export default new UserModel();