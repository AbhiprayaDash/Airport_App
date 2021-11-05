export const FilterName = model =>async(req,res)=>{
    try{
        const result = await model.find({name:req.body.name})
        return res.status(200).send(result)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}

export const FilterAirPort = model =>({
    FilterName:FilterName(model)
})