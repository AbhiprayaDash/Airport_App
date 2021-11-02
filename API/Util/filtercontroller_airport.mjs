export const FilterName = model =>async(req,res)=>{
    try{
        const result = await model.find({name:req.body.name})
        res.send(result)
    }
    catch(e)
    {
        res.send(e)
    }
}

export const FilterAirPort = model =>({
    FilterName:FilterName(model)
})