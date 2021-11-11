export const AddAirport = model=>async (req,res)=>{
    const airportname = req.body.name
    console.log(airportname)
    try{
        const result = await model.findOne({name:airportname})
        if(result)
        {
            console.log('exists')
            return res.status(400).send('Airport Exists')
        }
        await model.create({name:req.body.name,fuelcapacity:req.body.fuelcapacity,fuelavailable:req.body.fuelavailable})
    }
    catch(e){
        return res.status(400).send('Capacity should not be greater than 100000');
    }  
    console.log('added')
    return res.status(200).send('airport added');
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