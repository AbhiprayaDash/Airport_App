import axios from "axios";
import * as EmailValidator from 'email-validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errormsg} from '../Toast/toastservice'
var passwordValidator = require('password-validator');


export async function validateSignupData(reqbody:any):Promise<any>{
    if(EmailValidator.validate(reqbody.email)===false)
    {
        errormsg("Enter a proper Email Account")
        throw "Email is not valid"
    }
    var schema = new passwordValidator();
    schema
        .is().min(8)                                    // Minimum length 8
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
    if(schema.validate(reqbody.password)===false)
    {
        errormsg("Enter a proper password")
        throw "Password is not valid"
    }
    await axios.post('http://localhost:9000/user/signup',reqbody);
}
export function isAuthenticated():Object{
    var AccessToken:string=localStorage.getItem('user')|| 'null'
    return JSON.parse(AccessToken);
}
export async function postlogindata(reqbody:any):Promise<any>{
    const response = await axios.post('http://localhost:9000/user/signin',reqbody)
    const Accesstoken = response.data
    if(Accesstoken)
    {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
}
    