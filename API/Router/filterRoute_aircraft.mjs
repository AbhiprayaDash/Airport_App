import  Router  from "express";
import { AircraftController } from "../controller/FilterController.mjs";
const router = Router();

router.
    route('/aircraft_no')
     .get(function(req,res){
         console.log(req.query)
         if(req.query.sort==="desc")
         {
            AircraftController.FilterbynoDesc(req,res)
         }
         else if(req.query.sort==="asc")
         {
            AircraftController.FilterbynoAsc(req,res)
         }
    })
router.
    route('/airline')
     .get(function(req,res){
         console.log('saddsa')
         console.log(req.query.sort)
        if(req.query.sort==="desc")
        {
            AircraftController.FilterByAirlineDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AircraftController.FilterByAirlineAsc(req,res)
        }
})
export default router