export const Transactiontype = model =>async (req,res)=>{
    try{
        const response =await model.find({Type:req.body.type})
        res.send(response)
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterByAirport = model =>async(req,res)=>{
    try{
        console.log(req.body.name)
        console.log('response')
        const response = await model.find({}).populate({
            path: 'airport',
            match: { 'name': req.body.name }
        })
        const result = response.filter(res=>res.airport!==null)
        console.log(result)
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterByAircraft = model =>async(req,res)=>{
    try{
        const response = await model.find({Type:"OUT"}).populate({
            path: 'aircraft',
            match: { 'aircraft_no': req.body.aircraft }
        })
        const result = response.filter(res=>res.aircraft!==null)
        console.log(result)
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterTransaction = model =>({
    Transactiontype:Transactiontype(model),
    FilterByAirport:FilterByAirport(model),
    FilterByAircraft:FilterByAircraft(model)
})