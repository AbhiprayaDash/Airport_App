export const AddAirport = model=>async (req,res)=>{
    const result = await model.create({details:req.body.details,fuelcapacity:req.body.fuelcapacity,fuelavailable:req.body.fuelavailable})
    res.send('airport added');
}

export const getAirport = model =>async(req,res)=>{
    const result = await model.find({}).sort({details:1}).limit(5);
    res.send(result);
}

export const AirportControllerutil = model =>({
    AddAirport:AddAirport(model),
    getAirport:getAirport(model)
})