export const AddAircraft = model=>async (req,res)=>{
    const result = await model.create({aircraft_no:req.body.aircraft_no,airline:req.body.airline})
    console.log(result);
    res.send('aircraft added');
}

export const AircraftControllerutil = model =>({
    AddAircraft:AddAircraft(model)
})