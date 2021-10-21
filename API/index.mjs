import express from 'express'
import InputCheck from './middleware/InputCheck.mjs'
import {AircraftController} from './controller/AircraftController.mjs'
import { AirportController } from './controller/AirportController.mjs'
import bodyParser from 'body-parser';
import cors from "cors";
import AuthRoute from './Router/auth_route.mjs'

const app = express();
const port = 9000;


//middlewares
app.use(InputCheck);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

//Routes
app.use('/user',AuthRoute);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/aircraft',(req,res)=>{
    AircraftController.AddAircraft(req,res);
})
app.get('/aircraft',(req,res)=>{
    AircraftController.getAircraft(req,res);
})
app.post('/airport',(req,res)=>{
    AirportController.AddAirport(req,res);
})
app.get('/airport',(req,res)=>{
  AirportController.getAirport(req,res);
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})