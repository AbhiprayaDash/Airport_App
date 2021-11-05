import  Router  from "express";
import { AirportController } from '../controller/AirportController.mjs'

//Route
import sortRouterAiport from './sortRouteAirport.mjs'
import FilterRouterAirPort from './filterroute_airport.mjs';
const router = Router();

router.
         /**
       * @swagger
       * /airport/:
       *   post:
       *     description: Post Aircraft Data
       * parameters:
       *      - name: name
       *        description: Airport Name
       *        in: formData
       *        required: true
       *        type: string
       *      - name-fuelavailable
       *        description: Fuel Available in the Airport
       *        in: formData
       *        required: true
       *        type: number
       *      - name:fuelcapacity
       *        description: Fuel Capacity of the Airport
       *        in: formData
       *        required:true
       *    
       *     responses:
       *       200:
       *         description: Success
       * 
       */
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