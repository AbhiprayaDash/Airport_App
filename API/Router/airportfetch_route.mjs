import Router from 'express'
import AirportList from '../models/airportlist_model.mjs'
const router=Router()

router.
    route('/')
    .get(async function (req,res){
        console.log('hitted')
        try{
            const result = await AirportList.find()
            return res.status(200).send(result)
        }
        catch(e)
        {
            return res.status(400).send(e)
        }
    })
    .post(async function (req,res){
        console.log('hit')
        const airport=req.body.airportname;
        try{
            var fetcheddata=await AirportList.find()
            if(fetcheddata.length===0)
            {
               await AirportList.create({airportList:airport})
               return res.status(200)
            }
            var resultdata=fetcheddata[0].airportList
            resultdata.push(airport)
            await AirportList.updateOne({_id:fetcheddata[0]._id},{
                airportList:resultdata
            })
            return res.status(200)
        }
        catch(e)
        {
            return res.status(400).send(e)
        }
    })
    .delete(async function(req,res){
        try{
            const result = await AirportList.find()
            const resarray = result.splice(req.body.index,1)
            await AirportList.updateOne({_id:result._id},
                {airportList:resarray})
            return res.status(200).send('successful')
        }
        catch(e)
        {
            return res.status(400).send(e)
        }

    })
export default router;