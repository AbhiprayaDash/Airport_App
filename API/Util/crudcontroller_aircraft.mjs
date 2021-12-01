export const AddAircraft = model=>async (req,res)=>{
    try{
        await model.create({aircraft_no:req.body.aircraft_no,airline:req.body.airline})
        return res.status(200).send('aircraft added');
    }
    catch(e)
    {
        return res.status(400).send('Aircraft Exists')
    }

}
export const getAircraft = model =>async(req,res)=>{
    try{
        const result = await model.find({},{_id:0,aircraft_no:1,airline:1}).sort({_id:-1});
        return res.status(200).send(result);
    }
    catch(e)
    {
        return res.status(400).json({msg:e})
    }
}
export const updateAircraft = model =>async(req,res)=>{
    try{
        const aircraft = req.params.aircraft_no;
        const newairline = req.query.airline;
        const res = await model.update(
            {aircraft_no:aircraft},
            {airline:newairline}
        )
        return res.status(200).send('Aircraft updated')
    }
    catch(e)
    {
        return res.status(400).json({msg:e})
    }
}
export const deleteAircraft = model =>async(req,res)=>{
    try{
        const aircraft = req.params.aircraft_no;
        await model.deleteOne({aircraft_no:aircraft});
        return res.status(200).send('Aircraft deleted')
    }
    catch(e)
    {
        return res.status(400).json({msg:e})
    }
}
export const AircraftControllerutil = model =>({
    AddAircraft:AddAircraft(model),
    getAircraft:getAircraft(model),
    updateAircraft:updateAircraft(model),
    deleteAircraft:deleteAircraft(model)
})