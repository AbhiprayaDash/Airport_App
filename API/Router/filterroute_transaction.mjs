import  Router  from "express";
import { TransactionFilter } from '../controller/Filtercontroller.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        TransactionFilter.TransactionFilter(req,res)
     })
export default router