export const FilterbynoAsc = model=>async (req,res)=>{
    try{
        console.log('entered')
        const result =await model.find({}).sort({aircraft_no:1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterbynoDesc = model=>async (req,res)=>{
    try{
        const result =await model.find().sort({aircraft_no:-1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterByAirlineDesc = model => async(req,res)=>{
    try{
        const result =await model.find({}).sort({airline:-1})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterByAirlineAsc = model =>async(req,res)=>{
    try{
        const result =await model.find({}).sort({airline:1})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}

export const FilterAircraft = model =>({
    FilterbynoAsc:FilterbynoAsc(model),
    FilterbynoDesc:FilterbynoDesc(model),
    FilterByAirlineDesc:FilterByAirlineDesc(model),
    FilterByAirlineAsc:FilterByAirlineAsc(model)
})
