import  Router  from "express";
import {AircraftController} from '../controller/AircraftController.mjs';

//Router
import FilterRouterAircraft from './filterroute_aircraft.mjs';
import sortRouterAircraft from './sortRoute_aircraft.mjs';
//import AuthFunc from '../middleware/auth.js'
const router = Router();

//router.use(AuthFunc)
router.
     route('/')
     .post(function(req,res){
        AircraftController.AddAircraft(req,res);
     })
     .get(function(req,res){
        AircraftController.getAircraft(req,res);
     })
router.
      route('/:aircraft_no')
     .put(function(req,res){
        AircraftController.updateAircraft(req,res)
     })
     .delete(function(req,res){
        AircraftController.deleteAircraft(req,res)
     })
router.use('/filter',FilterRouterAircraft)
router.use('/sort',sortRouterAircraft)

export default router