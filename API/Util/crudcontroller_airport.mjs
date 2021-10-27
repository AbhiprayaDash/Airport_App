export const AddAirport = model=>async (req,res)=>{
    const airportname = req.body.name
    console.log(airportname)
    try{
        const result = await model.findOne({name:airportname})
        console.log(result)
        if(result)
        {
            console.log('existssad')
            return res.send('Airport Exists')
        }
        await model.create({name:req.body.name,fuelcapacity:req.body.fuelcapacity,fuelavailable:req.body.fuelavailable})
    }
    catch(e){
        console.log('exceeded')
        return res.send('Number exeeded');
    }  
    res.send('airport added');
}

export const getAirport = model =>async(req,res)=>{
    const result = await model.find({}).sort({name:1}).limit(5);
    res.send(result);
}

export const AirportControllerutil = model =>({
    AddAirport:AddAirport(model),
    getAirport:getAirport(model)
})