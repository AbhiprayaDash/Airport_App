import  Router  from "express";
import { AircraftFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/airline')
     .post(function(req,res){
        AircraftFilter.FilterAirline(req,res)
     })

export default router