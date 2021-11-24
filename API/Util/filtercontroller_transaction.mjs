const TransactionFilterHandler = async (category,model,req,res) =>{
    if(category==="Type")
    {
        const response =await model.find({Type:req.params.filtertype}).populate({
            path:'aircraft'
        })
        return res.status(200).send(response)
    }
    else if(category==="Aircraft")
    {
        const response = await model.find({Type:"OUT"}).populate({
            path: 'aircraft',
            match: { 'aircraft_no': req.params.filtertype }
        })
        const result = response.filter(res=>res.aircraft!==null)
        return res.status(200).send(result)
    }
}

export const TransactionFilter = (model) =>async (req,res)=>{
    try{
        const category=req.params.category
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