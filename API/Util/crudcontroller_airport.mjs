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
        return res.status(400).send('Capacity should not be greater than 100000');
    }  
    return res.status(200).send('airport added');
}

export const getAirport = model =>async(req,res)=>{
    try{
        console.log(req)
        const result = await model.find({}).sort({_id:-1});
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const deleteAirport = model =>async(req,res)=>{
    try{
        await model.deleteOne({name:req.params.airportname})
        return res.status(200).send('Airport deleted')
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const updateAirport = model =>async(req,res)=>{
    try{
        const airport = req.params.airportname;
        if(req.query.hasOwnProperty('fuelcapacity'))
        {
            await model.update(
                {name:airport},
                {fuelcapacity:req.query.fuelcapacity}
            )
        }
        if(req.query.hasOwnProperty('name'))
        {
            await model.update(
                {name:airport},
                {name:req.query.name}
            )
        }
        return res.status(200).send('Aircraft updated')
    }
    catch(e)
    {
        return res.status(400).json({msg:e})
    }
}
export const AirportControllerutil = model =>({
    AddAirport:AddAirport(model),
    getAirport:getAirport(model),
    updateAirport:updateAirport(model),
    deleteAirport:deleteAirport(model)
})