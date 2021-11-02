import { SortAirport } from "../Util/sortcontroller_transaction.mjs"
import { SortAircraft } from "../Util/sortcontroller_aircraft.mjs"
import {SortTransaction} from "../Util/sortcontroller_airport.mjs"
//models 
import Airport_model from '../models/Airport_model.mjs'
import Aircraft_model from '../models/Aircraft_model.mjs'
import Trasaction_model from '../models/transaction_model.mjs'

//controller
export const AircraftSort = SortAircraft(Aircraft_model)
export const AirportSort = SortAirport(Airport_model)
export const TransactionSort = SortTransaction(Trasaction_model)