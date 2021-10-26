import  Router  from "express";
import {AircraftController} from '../controller/AircraftController.mjs'
const router = Router();

router.
     route('/')
     .post(function(req,res){
        AircraftController.AddAircraft(req,res);
     })
     .get(function(req,res){
        AircraftController.getAircraft(req,res);
     })

export default router