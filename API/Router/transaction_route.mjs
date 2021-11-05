import  Router  from "express";
import { TransactionController } from '../controller/TransactionController.mjs';
import sortRouterTransaction from './sortRoute_transaction.mjs';
import FilterRouterTransaction from './filterroute_transaction.mjs';
const router = Router();

router.
     route('/')
     .post(function(req,res){
        TransactionController.postransaction(req,res);
     })
     .get(function(req,res){
        TransactionController.getransaction(req,res);
    })
router.use('/filter',FilterRouterTransaction)
router.use('/sort',sortRouterTransaction)
export default router