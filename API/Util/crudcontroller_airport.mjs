export const AddAirport = model=>async (req,res)=>{
    const airportname = req.body.name
    try{
        const result = await model.findOne({name:airportname})
        if(result)
        {
            return res.status(400).send('Airport Exists')
        }
        await model.create({name:req.body.name,fuelcapacity:req.body.fuelcapacity,fuelavailable:req.body.fuelavailable})
    }
    catch(e){
        return res.status(400).send('Number exeeded');
    }  
    res.status(200).send('airport added');
}

export const getAirport = model =>async(req,res)=>{
    try{
        const result = await model.find({})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const AirportControllerutil = model =>({
    AddAirport:AddAirport(model),
    getAirport:getAirport(model)
})