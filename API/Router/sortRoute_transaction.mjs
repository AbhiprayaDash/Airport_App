import  Router  from "express";
import { TransactionSort } from '../controller/SortController.mjs';
const router = Router();

router.
     route('/date')
     .get(function(req,res){
      if(req.query.sort==="desc")
      {
         TransactionSort.SortbyDateDesc(req,res)
      }
      else if(req.query.sort==="asc")
      {
         TransactionSort.SortbyDateAsc(req,res)
      }
     })
router.
     route('/quantity')
     .get(function(req,res){
        console.log('entered')
      if(req.query.sort==="desc")
      {
         console.log('desc')
         TransactionSort.SortbyQuantityDesc(req,res)
      }
      else if(req.query.sort==="asc")
      {
         console.log('asc')
         TransactionSort.SortbyQuantityAsc(req,res)
      }
     })
router.
     route('/recent')
     .get(function(req,res){
        TransactionSort.SortByRecent(req,res)
     })
router.
     route('/older')
     .get(function(req,res){
        TransactionSort.SortByOlder(req,res)
     })

export default router