import { error } from "console";
import mongoose, {ConnectOptions} from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async() =>{
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('MongoDB is already connected')
        return;
    }

    try{
        await mongoose.connect(
            process.env.MONGODB_URI!,{
                dbName: 'tasks',
            } as ConnectOptions

        )
    }
    catch(error){
        console.log(error)
    }
}