export const Transactiontype = model =>async (req,res)=>{
    try{
        const response =await model.find({Type:req.body.type}).populate({
            path:'aircraft'
        })
        return res.status(200).send(response)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const FilterByAirport = model =>async(req,res)=>{
    try{
        const response = await model.find({}).populate({
            path: 'airport',
            match: { 'name': req.body.name }
        })
        return res.status(200).send(result)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const FilterByAircraft = model =>async(req,res)=>{
    try{
        const response = await model.find({Type:"OUT"}).populate({
            path: 'aircraft',
            match: { 'aircraft_no': req.body.aircraft }
        })
        const result = response.filter(res=>res.aircraft!==null)
        return res.status(200).send(result)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const FilterTransaction = model =>({
    Transactiontype:Transactiontype(model),
    FilterByAirport:FilterByAirport(model),
    FilterByAircraft:FilterByAircraft(model)
})