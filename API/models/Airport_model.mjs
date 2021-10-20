import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/AirportData');

const AirportSchema = new Schema({
    details:{
        name:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        }
    },
    fuelcapacity:{
        type:Number,
        required:true
    },
    fuelavailable:{
        type:Number,
        required:true
    },
});

export default mongoose.model('airport',AirportSchema);