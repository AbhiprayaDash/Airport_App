import { filterAirport } from "../Util/filtercontroller_airport.mjs"
import { FilterAircraft } from "../Util/filtercontroller_aircraft.mjs"
import {FilterTransaction} from "../Util/filtercontroller_transaction.mjs"
//models 
import Airport_model from '../models/Airport_model.mjs'
import Aircraft_model from '../models/Aircraft_model.mjs'
import Trasaction_model from '../models/transaction_model.mjs'

//controller
export const AircraftController = FilterAircraft(Aircraft_model)
export const AirportFilter = filterAirport(Airport_model)
export const TransactionFilter = FilterTransaction(Trasaction_model)