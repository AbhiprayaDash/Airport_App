import express from 'express'
import InputCheck from './middleware/InputCheck.mjs'
import bodyParser from 'body-parser';
import cors from "cors";
import AuthRoute from './Router/auth_route.mjs'
import AircraftRoute from './Router/aircraft_route.mjs'
import AirportRoute from './Router/airport_route.mjs';
import AirportFetch from './Router/airportfetch_route.mjs'
import AircraftFetch from './Router/aircraftfetch_route.mjs'
import TransactionRoute from './Router/transaction_route.mjs'
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv'
import { mongoconnection } from './config/mongoconnection.mjs';
dotenv.config()
const swaggerDocument = YAML.load('./swagger.yaml');
swaggerUI.setup(swaggerDocument);


const app = express();
const port = 9000;


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
app.use(InputCheck);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//Routes

app.use('/v1/users',AuthRoute);
app.use('/v1/aircrafts',AircraftRoute);
app.use('/v1/airports',AirportRoute);
app.use('/v1/transactions',TransactionRoute)
app.use('/v1/airportlist',AirportFetch)
app.use('/v1/aircraftlist',AircraftFetch)
app.get('/v1/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, async () => {
  await mongoconnection()
  console.log(`Example app listening at http://localhost:${port}`)
})