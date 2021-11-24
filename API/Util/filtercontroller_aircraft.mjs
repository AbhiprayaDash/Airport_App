const AircraftFilterHandler = async (category,model,req,res) =>{
    if(category==="Airline")
    {
        const result = await model.find({airline:req.params.filtertype})
        res.status(200).send(result)
    }
}
export const AircraftFilter = model =>async (req,res)=>{
    try{
        const category=req.params.category
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