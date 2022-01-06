import  Router  from "express";
import {AuthController} from '../controller/AuthController.mjs'
const router = Router();

router.
     route('/signin')
     .post(function(req,res){
        AuthController.loginController(req,res);
     })

router.
     route('/signup')
     .post(function(req,res){
         AuthController.SignupController(req,res);
     })
router.
     route('/username/:id')
     .get(function(req,res){
         AuthController.Usernamecontroller(req,res);
     })

export default router