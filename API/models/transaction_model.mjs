import mongoose from 'mongoose';
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    Duration:{
        date:{
            type:Date,
            required:true,
            default:Date.now
        }
    },
    Type:{
        type:String,
        required:true
    },
    airport:{
        type: Schema.Types.ObjectId, 
        ref: 'airport',
        required:true
    },
    aircraft:{
        type: Schema.Types.ObjectId, 
        ref: 'aircraft',
    },
    quantity:{
        type:Number,
        required:true,
        min:500
    }
});

export default mongoose.model('transaction',TransactionSchema);