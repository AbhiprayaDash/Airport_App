import  Router  from "express";
import { AirportFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/name')
     .post(function(req,res){
        AirportFilter.FilterName(req,res)
     })
     
export default router