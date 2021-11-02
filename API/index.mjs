import express from 'express'
import InputCheck from './middleware/InputCheck.mjs'
import bodyParser from 'body-parser';
import cors from "cors";
import AuthRoute from './Router/auth_route.mjs'
import AircraftRoute from './Router/aircraft_route.mjs'
import AirportRoute from './Router/airport_route.mjs';
import TransactionRoute from './Router/transaction_route.mjs'
import sortRouterAiport from './Router/sortRouteAirport.mjs'
import sortRouterAircraft from './Router/sortRoute_aircraft.mjs'
import sortRouterTransaction from './Router/sortRoute_transaction.mjs';
import FilterRouterTransaction from './Router/filterroute_transaction.mjs';
import FilterRouterAirPort from './Router/filterroute_airport.mjs';
import FilterRouterAircraft from './Router/filterroute_aircraft.mjs';

const app = express();
const port = 9000;


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
app.use(InputCheck);

//Routes
app.use('/user',AuthRoute);
app.use('/aircraft',AircraftRoute);
app.use('/airport',AirportRoute);
app.use('/transaction',TransactionRoute)
app.use('/airport/sort',sortRouterAiport)
app.use('/aircraft/sort',sortRouterAircraft)
app.use('/transaction/sort',sortRouterTransaction)
app.use('/transaction/filter',FilterRouterTransaction)
app.use('/airport/filter',FilterRouterAirPort)
app.use('/aircraft/filter',FilterRouterAircraft)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})