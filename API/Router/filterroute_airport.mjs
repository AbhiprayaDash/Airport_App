import  Router  from "express";
import { AirportFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/:filtertype/:category')
     .get(function(req,res){
        AirportFilter.AirportFilter(req,res)
     })
     
export default router