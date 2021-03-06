"use strict";

var _express = _interopRequireDefault(require("express"));

var _InputCheck = _interopRequireDefault(require("./middleware/InputCheck.mjs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _auth_route = _interopRequireDefault(require("./Router/auth_route.mjs"));

var _aircraft_route = _interopRequireDefault(require("./Router/aircraft_route.mjs"));

var _airport_route = _interopRequireDefault(require("./Router/airport_route.mjs"));

var _airportfetch_route = _interopRequireDefault(require("./Router/airportfetch_route.mjs"));

var _aircraftfetch_route = _interopRequireDefault(require("./Router/aircraftfetch_route.mjs"));

var _transaction_route = _interopRequireDefault(require("./Router/transaction_route.mjs"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoconnection = require("./config/mongoconnection.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const swaggerDocument = _yamljs.default.load('./swagger.yaml');

_swaggerUiExpress.default.setup(swaggerDocument);

const app = (0, _express.default)();
const port = 9000; //middlewares

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
app.use(_InputCheck.default);
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument)); //Routes

app.use('/v1/users', _auth_route.default);
app.use('/v1/aircrafts', _aircraft_route.default);
app.use('/v1/airports', _airport_route.default);
app.use('/v1/transactions', _transaction_route.default);
app.use('/v1/airportlist', _airportfetch_route.default);
app.use('/v1/aircraftlist', _aircraftfetch_route.default);
app.get('/v1/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, async () => {
  await (0, _mongoconnection.mongoconnection)();
  console.log(`Example app listening at http://localhost:${port}`);
});