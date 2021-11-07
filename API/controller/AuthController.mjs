import {AuthUtilController} from '../Util/crudcontroller_auth.mjs'
import user from '../models/User_model.mjs'

export const AuthController = AuthUtilController(user)