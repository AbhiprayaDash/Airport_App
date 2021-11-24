import  Router  from "express";
import { AircraftFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/:filtertype/:category')
     .get(function(req,res){
        AircraftFilter.AircraftFilter(req,res)
     })

export default router