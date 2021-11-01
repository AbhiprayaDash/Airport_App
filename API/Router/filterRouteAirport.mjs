import  Router  from "express";
import { AirportFilter } from "../controller/FilterController.mjs";
const router = Router();

router.
    route('/fuelcapacity')
     .get(function(req,res){
         if(req.query.sort==="desc")
         {
            AirportFilter.filterFuelCapacityDesc(req,res)
         }
         else if(req.query.sort==="asc")
         {
            AirportFilter.filterFuelCapacityAsc(req,res)
         }
    })
router.
    route('/fuelavailable')
     .get(function(req,res){
        if(req.query.sort==="desc")
        {
            AirportFilter.filterFuelAvailableDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AirportFilter.filterFuelAvailableAsc(req,res)
        }
    })
router.
    route('/name')
     .get(function(req,res){
        if(req.query.sort==="desc")
        {
            AirportFilter.filterBynameDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AirportFilter.filterBynameAsc(req,res)
        }
    })
export default router