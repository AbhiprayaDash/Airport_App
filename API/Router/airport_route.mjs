import  Router  from "express";
import { AirportController } from '../controller/AirportController.mjs'
const router = Router();

router.
     route('/')
     .post(function(req,res){
        AirportController.AddAirport(req,res);
     })
     .get(function(req,res){
        AirportController.getAirport(req,res);
     })
export default router