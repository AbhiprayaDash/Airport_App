import  Router  from "express";
import { AirportController } from '../controller/AirportController.mjs'

//Route
import sortRouterAiport from './sortRouteAirport.mjs'
import FilterRouterAirPort from './filterroute_airport.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        AirportController.AddAirport(req,res);
     })
     .get(function(req,res){
        AirportController.getAirport(req,res);
     })
router.use('/sort',sortRouterAiport)
router.use('/filter',FilterRouterAirPort)
export default router