import mongoose from 'mongoose';
const { Schema } = mongoose;


const AirportSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    fuelcapacity:{
        type:Number,
        required:true,
        min:1000,
        max:100000
    },
    fuelavailable:{
        type:Number,
        required:true,
        default:0,
        max:100000
    },
});

export default mongoose.model('airport',AirportSchema);