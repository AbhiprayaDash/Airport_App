import  Router  from "express";
import { TransactionController } from '../controller/TransactionController.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        TransactionController.postransaction(req,res);
     })
     .get(function(req,res){
        TransactionController.getransaction(req,res);
    })

export default router