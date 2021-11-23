const AircraftFilterHandler = async (category,model,req,res) =>{
    if(category==="Airline")
    {
        const result = await model.find({airline:req.query.airline})
        res.status(200).send(result)
    }
}
export const AircraftFilter = model =>async (req,res)=>{
    try{
        const category=req.query.category
        AircraftFilterHandler(category,model,req,res)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

export const FilterAircraft = model =>({
    AircraftFilter:AircraftFilter(model)
})