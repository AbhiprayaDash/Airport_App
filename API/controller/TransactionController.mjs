import {TransactionUtilController} from '../Util/crudcontroller_transaction.mjs'
import Aircraft_model from '../models/Aircraft_model.mjs'
import Airport_model from "../models/Airport_model.mjs"
import Transaction_model from "../models/transaction_model.mjs"

export const TransactionController = TransactionUtilController(Transaction_model,Airport_model,Aircraft_model)