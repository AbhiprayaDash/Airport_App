import Router from 'express'
import AircraftList from '../models/aircraftlist_model.mjs'
const router=Router()

router.
    route('/')
    .get(async function (req,res){
        try{
            const result = await AircraftList.find()
            return res.status(200).send(result)
        }
        catch(e)
        {
            return res.status(400).send(e)
        }
    })
    .post(async function (req,res){
        const aircraft=req.body.aircraftno;
        try{
            var fetcheddata=await AircraftList.find()
            console.log(fetcheddata)
            if(fetcheddata.length===0)
            {
               await AircraftList.create({aircraftlist:aircraft})
               return res.status(200)
            }
            var resultdata=fetcheddata[0].aircraftlist
            resultdata.push(aircraft)
            await AircraftList.updateOne({_id:fetcheddata[0]._id},{
                aircraftlist:resultdata
            })
            return res.status(200)
        }
        catch(e)
        {
            console.log('error')
            return res.status(400).send(e)
        }
    })
    .delete(async function(req,res){
        try{
            console.log(req.body.indexvalue)
            const result = await AircraftList.find()
            const resultarray=result[0].aircraftlist.splice(req.body.indexvalue,1)
            console.log(resultarray)
            await AircraftList.updateOne({_id:result[0]._id},
                {aircraftlist:result[0].aircraftlist})
            return res.status(200).send('successful')
        }
        catch(e)
        {
            return res.status(400).send(e)
        }

    })
export default router;