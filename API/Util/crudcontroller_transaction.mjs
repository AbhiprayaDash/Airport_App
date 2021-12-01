export const postransaction = (model,AirportModel,AircraftModel) =>async(req,res)=>{
    const Airportresult = await AirportModel.findOne(
        {'name':req.body.airport_name}
    )
    if(!Airportresult)
    {
        return res.status(400).send("NoAirportAvailable");
    }
    if(req.body.type=='OUT')
    {
        const AircraftResult = await AircraftModel.findOne(
            {aircraft_no:req.body.aircraft_no}
        )
        if(!AircraftResult)
        {
            return res.status(400).send("NoAircraftAvailable");
        }
        try{
            if(Airportresult.fuelavailable-req.body.quantity<0)
            {
                return res.status(400).send("NoFuelAvailable");
            }
            await AirportModel.update(
                {_id:Airportresult._id},
                { 
                $inc:{fuelavailable:-req.body.quantity}
                }
            )
        const result = await model.create({Type:req.body.type,airport:Airportresult._id,aircraft:AircraftResult._id,quantity:req.body.quantity})
        return res.status(200).send(result)
        }
        catch(e)
        {
            return res.status(400).send(e);
        }
    }
    else{ 
        try{
            if((Airportresult.fuelcapacity)<Number(req.body.quantity)+Airportresult.fuelavailable)
            {
                res.statusCode=400
                return res.send("NoCapacity");
            }
            await AirportModel.update(
                {_id:Airportresult._id},
            { 
                $inc:{fuelavailable:req.body.quantity}
            }
            )
            const result = await model.create({Type:req.body.type,airport:Airportresult._id,quantity:req.body.quantity})
            return res.status(200).send(result)
        }
        catch(e)
        {
            return res.status(400).send(e);
        }
    }
}

export const getransaction = (model)=> async(req,res)=>{
    try{
        const result=await model.find({Type:"IN"}).populate("airport").sort({"_id":-1})
        const result2 = await model.find({Type:"OUT"}).populate("aircraft").populate("airport").sort({"_id":-1})
        const finalresult = result.concat(result2)
        return res.status(200).send(finalresult)
    }
    catch(e)
    {
        return res.status(400).send(e);
    }
}

export const deleteTransaction = (model) => async(req,res)=>{
    try{
        await model.deleteOne({_id:req.params.id})
        return res.status(200).send('Transaction deleted')
    }
    catch(e)
    {
        return res.status(400).send(e);
    }
}
export const updateTransaction = model =>async(req,res)=>{
    try{
        await model.updateOne(
            {_id:req.params.id},
            {quantity:req.query.quantity}
        )
        return res.status(200).send('Transaction updated')
    }
    catch(e)
    {
        return res.status(400).send(e);
    }
}
export const TransactionUtilController = (model,AirportModel,AircraftModel)=>({
    postransaction:postransaction(model,AirportModel,AircraftModel),
    getransaction:getransaction(model,AircraftModel),
    deleteTransaction:deleteTransaction(model),
    updateTransaction:updateTransaction(model)
})