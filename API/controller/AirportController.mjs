import {AirportControllerutil} from '../Util/crudcontroller_airport.mjs'
import Airport_model from '../models/Airport_model.mjs'

export const AirportController = AirportControllerutil(Airport_model)