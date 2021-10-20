import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/AirportData');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
});

export default mongoose.model('users',UserSchema);