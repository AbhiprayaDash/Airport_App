export const FilterbyDateAsc = model=>async (req,res)=>{
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

export const FilterbyDateDesc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"Duration.date":-1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterbyQuantityAsc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"quantity":1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}
export const FilterbyQuantityDesc = model=>async (req,res)=>{
    try{
        const result =await model.find({}).sort({"quantity":-1})
        res.send(result);
    }
    catch(e)
    {
        res.send(e)
    }
}

export const FilterTransaction = (model) =>({
    FilterbyDateAsc:FilterbyDateAsc(model),
    FilterbyDateDesc:FilterbyDateDesc(model),
    FilterbyQuantityAsc:FilterbyQuantityAsc(model),
    FilterbyQuantityDesc:FilterbyQuantityDesc(model)
})
