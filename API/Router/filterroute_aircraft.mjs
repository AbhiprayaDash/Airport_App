import  Router  from "express";
import { AircraftFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        AircraftFilter.AircraftFilter(req,res)
     })

export default router