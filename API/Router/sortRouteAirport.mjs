import  Router  from "express";
import { AirportSort } from "../controller/SortController.mjs";
const router = Router();

router.
    route('/fuelcapacity')
     .get(function(req,res){
         if(req.query.sort==="desc")
         {
            AirportSort.SortFuelCapacityDesc(req,res)
         }
         else if(req.query.sort==="asc")
         {
            AirportSort.SortFuelCapacityAsc(req,res)
         }
    })
router.
    route('/fuelavailable')
     .get(function(req,res){
        if(req.query.sort==="desc")
        {
            AirportSort.SortFuelAvailableDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AirportSort.SortFuelAvailableAsc(req,res)
        }
    })
router.
    route('/name')
     .get(function(req,res){
        if(req.query.sort==="desc")
        {
            AirportSort.SortBynameDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AirportSort.SortBynameAsc(req,res)
        }
    })

router.
    route('/recent')
    .get(function(req,res){
       AirportSort.SortByRecent(req,res)
    })
router.
    route('/older')
    .get(function(req,res){
       AirportSort.SortByOlder(req,res)
    })
export default router