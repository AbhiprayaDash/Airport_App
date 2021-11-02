export const SortBynameDesc=model=> async(req,res)=>{
    try{
        const result = await model.find().sort({"name":-1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}
export const SortBynameAsc=model=> async(req,res)=>{
    try{
        console.log('name entered')
        const result = await model.find().sort({"name":1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}
export const SortFuelAvailableDesc=model=> async(req,res)=>{
    try{
        const result = await model.find({}).sort({fuelavailable:-1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const SortFuelAvailableAsc=model=> async(req,res)=>{
    try{
        const result = await model.find().sort({"fuelavailable":1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const SortFuelCapacityDesc=model=> async(req,res)=>{
    try{
        console.log('entered')
        const result = await model.find().sort({fuelcapacity:-1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const SortFuelCapacityAsc=model=> async(req,res)=>{
    try{
        console.log('entered')
        const result = await model.find().sort({fuelcapacity:1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const SortByRecent =model =>async(req,res)=>{
    try{
        const result = await model.find({}).sort({"_id":-1})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}
export const SortByOlder = model =>async(req,res)=>{
    try{
        const result = await model.find({}).sort({"_id":1})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}

export const SortAirport =(model)=>({
    SortBynameAsc:SortBynameAsc(model),
    SortBynameDesc:SortBynameDesc(model),
    SortFuelAvailableAsc:SortFuelAvailableAsc(model),
    SortFuelAvailableDesc:SortFuelAvailableDesc(model),
    SortFuelCapacityAsc:SortFuelCapacityAsc(model),
    SortFuelCapacityDesc:SortFuelCapacityDesc(model),
    SortByRecent:SortByRecent(model),
    SortByOlder:SortByOlder(model)
})