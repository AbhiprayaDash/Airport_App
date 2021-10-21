"use strict";

var _express = _interopRequireDefault(require("express"));

var _InputCheck = _interopRequireDefault(require("./middleware/InputCheck.mjs"));

var _AircraftController = require("./controller/AircraftController.mjs");

var _AirportController = require("./controller/AirportController.mjs");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _auth_route = _interopRequireDefault(require("./Router/auth_route.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 9000; //middlewares

app.use(_InputCheck.default);
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)()); //Routes

app.use('/user', _auth_route.default);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/aircraft', (req, res) => {
  _AircraftController.AircraftController.AddAircraft(req, res);
});
app.get('/aircraft', (req, res) => {
  _AircraftController.AircraftController.getAircraft(req, res);
});
app.post('/airport', (req, res) => {
  _AirportController.AirportController.AddAirport(req, res);
});
app.post('/airport', (req, res) => {
  _AirportController.AirportController.getAirport(req, res);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});