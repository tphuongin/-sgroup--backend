import { ObjectId } from "mongodb";
import { getDB } from "../config/db.config.js"

class UserModel{
    async createUser(email, password, name){
        const user = await getDB().collection("users").insertOne({
            email,
            password,
            name,
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
    async updateUser(id, data){
        const user = await getDB().collection("users").updateOne(
            {_id: new ObjectId(String(id))},
            {$set: data}
        );
        return user;
    }
    async saveResetPassToken(email, resetPassToken, tokenExpiration){
        const user = await getDB().collection("users").updateOne(
            {email: email},
            {$set: {resetPassToken, tokenExpiration}}
        );
        return user;
    }
}

export default new UserModel();