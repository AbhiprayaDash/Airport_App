export const postransaction = (model,AirportModel,AircraftModel) =>async(req,res)=>{
    console.log('post')
    const Airportresult = await AirportModel.findOne(
        {'details.name':req.body.airport_name}
    )
    if((Airportresult.fuelcapacity)<Number(req.body.quantity)+Airportresult.fuelavailable)
    {
        console.log(Airportresult.fuelcapacity)
        console.log(Airportresult.fuelavailable)
        console.log(req.body.quantity)
        return res.status(401).json("Airport don't have enough capacity");
    }
    if(!Airportresult)
    {
        return res.status(401).json("Airport not found");
    }
    if(req.body.type=='OUT')
    {
        const AircraftResult = await AircraftModel.findOne(
            {aircraft_no:req.body.aircraft_no}
        )
        if(!AircraftResult)
        {
            return res.status(401).json("Aircraft not found");
        }
        try{
            console.log(Airportresult.fuelavailable)
            console.log(req.body.quantity)
        if(Airportresult.fuelavailable-req.body.quantity<0)
        {
            return res.status(401).json("Fuel Not available");
        }
            
        await AirportModel.update(
            {_id:Airportresult._id},
            { 
                $inc:{fuelavailable:-req.body.quantity}
            }
        )
        const result = await model.create({Type:req.body.type,airport:Airportresult._id,aircraft:AircraftResult._id,quantity:req.body.quantity})
        console.log(result)
        res.send(result)
        }
        catch(e)
        {
            res.send(e);
        }
    }
    else{ 
        try{
        await AirportModel.update(
            {_id:Airportresult._id},
            { 
                $inc:{fuelavailable:req.body.quantity}
            }
        )
        }
        catch(e)
        {
            res.send(e);
        }
        const result = await model.create({Type:req.body.type,airport:Airportresult._id,quantity:req.body.quantity})
        console.log(result)
        res.send(result)
    }
}

export const getransaction = (model,AircraftModel)=> async(req,res)=>{
    const result=await model.find({Type:"IN"}).populate("airport")
    console.log(result)
    const result2 = await model.find({Type:"OUT"}).populate("aircraft").populate("airport")
    const finalresult = result.concat(result2)
    res.send(finalresult)
}
export const TransactionUtilController = (model,AirportModel,AircraftModel)=>({
    postransaction:postransaction(model,AirportModel,AircraftModel),
    getransaction:getransaction(model,AircraftModel)
})