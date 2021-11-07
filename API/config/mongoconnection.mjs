import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
export const mongoconnection =() =>{
    console.log('conncted')
    return mongoose.connect(String(process.env.DB_URL));
}