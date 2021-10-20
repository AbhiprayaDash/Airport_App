export const AddAirport = model=>async (req,res)=>{
    const result = await model.create({details:req.body.details,fuelcapacity:req.body.fuelcapacity,fuelavailable:req.body.fuelavailable})
    console.log(result);
    res.send('airport added');
}

export const AirportControllerutil = model =>({
    AddAirport:AddAirport(model)
})