const TransactionFilterHandler = async (category,model,req,res) =>{
    if(category==="Type")
    {
        const response =await model.find({Type:req.query.type}).populate({
            path:'aircraft'
        })
        return res.status(200).send(response)
    }
    else if(category==="Aircraft")
    {
        const response = await model.find({Type:"OUT"}).populate({
            path: 'aircraft',
            match: { 'aircraft_no': req.query.aircraft }
        })
        const result = response.filter(res=>res.aircraft!==null)
        return res.status(200).send(result)
    }
}

export const TransactionFilter = (model) =>async (req,res)=>{
    try{
        const category=req.query.category
        console.log(req)
        TransactionFilterHandler(category,model,req,res)
    }
    catch(e)
    {
        return res.status(400).send(e)
    }
}
export const FilterTransaction = (model) =>({
    TransactionFilter:TransactionFilter(model)
})