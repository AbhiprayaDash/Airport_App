export const postransaction = (model,AirportModel,AircraftModel) =>async(req,res)=>{
    const Airportresult = await AirportModel.findOne(
        {'name':req.body.airport_name}
    )
    if(!Airportresult)
    {
        return res.send("NoAirport");
    }
    if(req.body.type=='OUT')
    {
        const AircraftResult = await AircraftModel.findOne(
            {aircraft_no:req.body.aircraft_no}
        )
        if(!AircraftResult)
        {
            return res.send("NoAircraft");
        }
        try{
            if(Airportresult.fuelavailable-req.body.quantity<0)
            {
                return res.send("NoFuel");
            }
            await AirportModel.update(
                {_id:Airportresult._id},
                { 
                $inc:{fuelavailable:-req.body.quantity}
                }
            )
        const result = await model.create({Type:req.body.type,airport:Airportresult._id,aircraft:AircraftResult._id,quantity:req.body.quantity})
        res.send(result)
        }
        catch(e)
        {
            res.send(e);
        }
    }
    else{ 
        try{
            if((Airportresult.fuelcapacity)<Number(req.body.quantity)+Airportresult.fuelavailable)
            {
                return res.send("NoCapacity");
            }
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
        res.send(result)
    }
}

export const getransaction = (model)=> async(req,res)=>{
    const result=await model.find({Type:"IN"}).populate("airport").sort({"_id":-1})
    const result2 = await model.find({Type:"OUT"}).populate("aircraft").populate("airport").sort({"_id":-1})
    const finalresult = result.concat(result2)
    console.log(finalresult)
    res.send(finalresult)
}
export const TransactionUtilController = (model,AirportModel,AircraftModel)=>({
    postransaction:postransaction(model,AirportModel,AircraftModel),
    getransaction:getransaction(model,AircraftModel)
})