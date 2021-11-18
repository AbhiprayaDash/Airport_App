export const AddAircraft = model=>async (req,res)=>{
    try{
        const result = await model.create({aircraft_no:req.body.aircraft_no,airline:req.body.airline})
        return res.status(200).send('aircraft added');
    }
    catch(e)
    {
        console.log('exists')
        return res.status(400).send('Aircraft Exists')
    }

}
export const getAircraft = model =>async(req,res)=>{
    try{
        const result = await model.find({},{_id:0,aircraft_no:1,airline:1}).sort({_id:-1});
        res.status(200).send(result);
    }
    catch(e)
    {
        return res.send(400).json({msg:e})
    }
}
export const AircraftControllerutil = model =>({
    AddAircraft:AddAircraft(model),
    getAircraft:getAircraft(model)
})