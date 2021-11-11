import  mongoose  from "mongoose";
const {Schema} = mongoose;

const AircraftListSchema = new Schema({
    aircraftlist:[Number]
})

export default mongoose.model('aircraftlist',AircraftListSchema);