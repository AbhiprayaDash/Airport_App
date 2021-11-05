import  Router  from "express";
import {AircraftController} from '../controller/AircraftController.mjs';

//Router
import FilterRouterAircraft from './filterroute_aircraft.mjs';
import sortRouterAircraft from './sortRoute_aircraft.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        AircraftController.AddAircraft(req,res);
     })
     .get(function(req,res){
        AircraftController.getAircraft(req,res);
     })
router.use('/filter',FilterRouterAircraft)
router.use('/sort',sortRouterAircraft)

export default router