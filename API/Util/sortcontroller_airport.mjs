export const SortbyDateAsc = model=>async (req,res)=>{
    try{
        console.log('entered')
        const result =await model.find({}).sort({"Duration.date":1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}

export const SortbyDateDesc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"Duration.date":-1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const SortbyQuantityAsc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"quantity":1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const SortbyQuantityDesc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"quantity":-1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
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
export const SortTransaction = (model) =>({
    SortbyDateAsc:SortbyDateAsc(model),
    SortbyDateDesc:SortbyDateDesc(model),
    SortbyQuantityAsc:SortbyQuantityAsc(model),
    SortbyQuantityDesc:SortbyQuantityDesc(model),
    SortByRecent:SortByRecent(model),
    SortByOlder:SortByOlder(model)
})
