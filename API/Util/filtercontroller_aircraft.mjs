export const FilterAirline = model =>async (req,res)=>{
    try{
        const result = await model.find({airline:req.body.airline})
        res.status(200).send(result)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
}

export const FilterAircraft = model =>({
    FilterAirline:FilterAirline(model)
})