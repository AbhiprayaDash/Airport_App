import  Router  from "express";
import { TransactionFilter } from '../controller/FilterController.mjs';
const router = Router();

router.
     route('/date')
     .get(function(req,res){
      if(req.query.sort==="desc")
      {
         TransactionFilter.FilterbyDateDesc(req,res)
      }
      else if(req.query.sort==="asc")
      {
         TransactionFilter.FilterbyDateAsc(req,res)
      }
     })
router.
     route('/quantity')
     .get(function(req,res){
        console.log('entered')
      if(req.query.sort==="desc")
      {
         console.log('desc')
         TransactionFilter.FilterbyQuantityDesc(req,res)
      }
      else if(req.query.sort==="asc")
      {
         console.log('asc')
         TransactionFilter.FilterbyQuantityAsc(req,res)
      }
     })

export default router