export const filterBynameDesc=model=> async(req,res)=>{
    try{
        const result = await model.find().sort({"name":-1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}
export const filterBynameAsc=model=> async(req,res)=>{
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
export const filterFuelAvailableDesc=model=> async(req,res)=>{
    try{
        const result = await model.find({}).sort({fuelavailable:-1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const filterFuelAvailableAsc=model=> async(req,res)=>{
    try{
        const result = await model.find().sort({"fuelavailable":1})
        return res.send(result)
    }
    catch(e)
    {
        return res.status(404).json({msg:'error'})
    }
}

export const filterFuelCapacityDesc=model=> async(req,res)=>{
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

export const filterFuelCapacityAsc=model=> async(req,res)=>{
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

export const filterAirport =(model)=>({
    filterBynameAsc:filterBynameAsc(model),
    filterBynameDesc:filterBynameDesc(model),
    filterFuelAvailableAsc:filterFuelAvailableAsc(model),
    filterFuelAvailableDesc:filterFuelAvailableDesc(model),
    filterFuelCapacityAsc:filterFuelCapacityAsc(model),
    filterFuelCapacityDesc:filterFuelCapacityDesc(model)
})