import  Router  from "express";
import { AirportController } from '../controller/AirportController.mjs'

//Route
import sortRouterAiport from './sortRouteAirport.mjs'
import FilterRouterAirPort from './filterroute_airport.mjs';
//import AuthFunc from '../middleware/auth.js'
const router = Router();

 //router.use(AuthFunc)
router.
     route('/')
     .post(function(req,res){
        AirportController.AddAirport(req,res);
     })
     .get(function(req,res){
        AirportController.getAirport(req,res);
     })
router.
     route('/:airportname')
     .put(function(req,res){
        AirportController.updateAirport(req,res);
     })
     .delete(function(req,res){
        AirportController.deleteAirport(req,res);
     })
router.use('/sort',sortRouterAiport)
router.use('/filter',FilterRouterAirPort)
export default router