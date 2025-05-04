import { MongoClient } from "mongodb";
import 'dotenv/config';

let dbInstance = null;
const client = new MongoClient(process.env.MONGODB_URI);

const ConnectDB = async () =>{
    await client.connect();
    dbInstance = client.db(process.env.MONGODB_NAME);
}
const getDB = () => {
    if(!dbInstance){
        throw new Error("DB is not init");
    }
    return dbInstance;
}

export {
    ConnectDB,
    getDB
};