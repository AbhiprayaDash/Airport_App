import  Router  from "express";
import { TransactionFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/type')
     .post(function(req,res){
        TransactionFilter.Transactiontype(req,res)
     })
router.
     route('/airportname')
     .post(function(req,res){
        TransactionFilter.FilterByAirport(req,res)
     })
router.
     route('/aircraftname')
     .post(function(req,res){
        TransactionFilter.FilterByAircraft(req,res)
     })
     
export default router