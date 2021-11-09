import  mongoose  from "mongoose";
const {Schema} = mongoose;

const AirportListSchema = new Schema({
    airportList:[String]
})

export default mongoose.model('airportlist',AirportListSchema);