export const FilterAirline = model =>async (req,res)=>{
    try{
        const result = await model.find({airline:req.body.airline})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}

export const FilterAircraft = model =>({
    FilterAirline:FilterAirline(model)
})