export const postransaction = (model,AirportModel,AircraftModel) =>async(req,res)=>{
    const Airportresult = await AirportModel.findOne(
        {'details.name':req.body.airport_name}
    )
    console.log(Airportresult)
    if(!Airportresult)
    {
        return res.status(401).json("Airport not found");
    }
    const AircraftResult = await AircraftModel.findOne(
        {aircraft_no:req.body.aircraft_no}
    )
    if(!AircraftResult)
    {
        return res.status(401).json("Airport not found");
    }
    const result = await model.create({Type:req.body.type,airport:Airportresult._id,aircraft:AircraftResult._id,quantity:req.body.quantity})
    console.log(result)
    res.send(result)

}

export const getransaction = model=> async(req,res)=>{
    const result=await model.find({})
    res.send(result)
}
export const TransactionUtilController = (model,AirportModel,AircraftModel)=>({
    postransaction:postransaction(model,AirportModel,AircraftModel),
    getransaction:getransaction(model)
})