export const SortbynoAsc = model=>async (req,res)=>{
    try{
        console.log('entered')
        const result =await model.find({}).sort({aircraft_no:1})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const SortbynoDesc = model=>async (req,res)=>{
    try{
        const result =await model.find().sort({aircraft_no:-1})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const SortByAirlineDesc = model => async(req,res)=>{
    try{
        const result =await model.find({}).sort({airline:-1})
        return res.status(200).send(result)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const SortByAirlineAsc = model =>async(req,res)=>{
    try{
        const result =await model.find({}).sort({airline:1})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const SortByRecent =model =>async(req,res)=>{
    try{
        const result = await model.find({}).sort({"_id":-1})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const SortByOlder = model =>async(req,res)=>{
    try{
        const result = await model.find({}).sort({"_id":1})
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const SortAircraft = model =>({
    SortbynoAsc:SortbynoAsc(model),
    SortbynoDesc:SortbynoDesc(model),
    SortByAirlineDesc:SortByAirlineDesc(model),
    SortByAirlineAsc:SortByAirlineAsc(model),
    SortByRecent:SortByRecent(model),
    SortByOlder:SortByOlder(model)
})
