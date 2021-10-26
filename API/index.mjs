import express from 'express'
import InputCheck from './middleware/InputCheck.mjs'
import bodyParser from 'body-parser';
import cors from "cors";
import AuthRoute from './Router/auth_route.mjs'
import AircraftRoute from './Router/aircraft_route.mjs'
import AirportRoute from './Router/airport_route.mjs';
import TransactionRoute from './Router/transaction_route.mjs'

const app = express();
const port = 9000;


//middlewares
app.use(InputCheck);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

//Routes
app.use('/user',AuthRoute);
app.use('/aircraft',AircraftRoute);
app.use('/airport',AirportRoute);
app.use('/transaction',TransactionRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})