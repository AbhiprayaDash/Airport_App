import  Router  from "express";
import { AircraftSort } from "../controller/SortController.mjs";
const router = Router();

router.
    route('/aircraft_no')
     .get(function(req,res){
         if(req.query.sort==="desc")
         {
            AircraftSort.SortbynoDesc(req,res)
         }
         else if(req.query.sort==="asc")
         {
            AircraftSort.SortbynoAsc(req,res)
         }
    })
router.
    route('/airline')
     .get(function(req,res){
         console.log('saddsa')
         console.log(req.query.sort)
        if(req.query.sort==="desc")
        {
            AircraftSort.SortByAirlineDesc(req,res)
        }
        else if(req.query.sort==="asc")
        {
            AircraftSort.SortByAirlineAsc(req,res)
        }
})

router.
     route('/recent')
     .get(function(req,res){
        AircraftSort.SortByRecent(req,res)
     })
router.
     route('/older')
     .get(function(req,res){
        AircraftSort.SortByOlder(req,res)
     })
export default router