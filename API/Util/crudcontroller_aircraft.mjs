export const AddAircraft = model=>async (req,res)=>{
    const result = await model.create({aircraft_no:req.body.aircraft_no,airline:req.body.airline})
    res.send('aircraft added');
}
export const getAircraft = model =>async(req,res)=>{
    const result = await model.find({},{_id:0,aircraft_no:1,airline:1}).sort({aircraft_no:1}).limit(5);
    res.send(result);
}
export const AircraftControllerutil = model =>({
    AddAircraft:AddAircraft(model),
    getAircraft:getAircraft(model)
})