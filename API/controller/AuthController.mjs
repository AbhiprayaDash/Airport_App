import {AuthUtilController} from '../Util/crudcontroller_auth.mjs'
import user from '../models/User_model.mjs'

var result =  AuthUtilController(user)
export const AuthController = result