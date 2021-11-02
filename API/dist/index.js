"use strict";

var _express = _interopRequireDefault(require("express"));

var _InputCheck = _interopRequireDefault(require("./middleware/InputCheck.mjs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _auth_route = _interopRequireDefault(require("./Router/auth_route.mjs"));

var _aircraft_route = _interopRequireDefault(require("./Router/aircraft_route.mjs"));

var _airport_route = _interopRequireDefault(require("./Router/airport_route.mjs"));

var _transaction_route = _interopRequireDefault(require("./Router/transaction_route.mjs"));

var _filterRouteAirport = _interopRequireDefault(require("./Router/filterRouteAirport.mjs"));

var _filterRoute_aircraft = _interopRequireDefault(require("./Router/filterRoute_aircraft.mjs"));

var _filterRoute_transaction = _interopRequireDefault(require("./Router/filterRoute_transaction.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 9000; //middlewares

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
app.use(_InputCheck.default); //Routes

app.use('/user', _auth_route.default);
app.use('/aircraft', _aircraft_route.default);
app.use('/airport', _airport_route.default);
app.use('/transaction', _transaction_route.default);
app.use('/airport/filter', _filterRouteAirport.default);
app.use('/aircraft/filter', _filterRoute_aircraft.default);
app.use('/transaction/filter', _filterRoute_transaction.default);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});