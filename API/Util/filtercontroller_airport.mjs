const AirportFilterhandler = async (category,model,req,res) =>{
    if(category==="name")
    {
        const result = await model.find({name:req.query.name})
        return res.status(200).send(result)
    }
}
export const AirportFilter = model =>async(req,res)=>{
    try{
        const category = req.query.category
        AirportFilterhandler(category,model,req,res)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const FilterAirPort = model =>({
    AirportFilter:AirportFilter(model)
})