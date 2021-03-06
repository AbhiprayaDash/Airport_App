import mongoose from 'mongoose';
const { Schema } = mongoose;

const AircraftSchema = new Schema({
    aircraft_no:{
        type:Number,
        required:true,
        unique:true
    },
    airline:{
        type:String,
        required:true
    }
});

export default mongoose.model('aircraft',AircraftSchema);