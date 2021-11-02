import { FilterAircraft } from "../Util/filtercontroller_aircraft.mjs"
import { FilterAirPort } from "../Util/filtercontroller_airport.mjs"
import { FilterTransaction } from "../Util/filtercontroller_transaction.mjs"

//models 
import Airport_model from '../models/Airport_model.mjs'
import Aircraft_model from '../models/Aircraft_model.mjs'
import Trasaction_model from '../models/transaction_model.mjs'

//controller
export const AircraftFilter = FilterAircraft(Aircraft_model)
export const AirportFilter = FilterAirPort(Airport_model)
export const TransactionFilter = FilterTransaction(Trasaction_model)