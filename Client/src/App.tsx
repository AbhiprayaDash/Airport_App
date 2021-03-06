import { Route, Switch } from "react-router";
import HomeComponent from './components/Home/homecomponent';
import SignUpComponent from './components/Auth/signupcomponent';
import {PrivateRoute} from './components/Route/PrivateRoute'
import AirportController from "./components/Airport/airport";
import AircraftController from "./components/Airport/aircraft";
import LogoutComponent from "./components/Auth/logout";
import DashboardContent from "./components/Dashboard/dashboard"
import AddTransaction from "./components/Transaction/addtransaction";
import ReportComponent from "./components/Report/report";
import Chart from "./components/Charts/charts";
import DisplayAirports from "./components/Airport/displayairport";
import DisplayAircrafts from "./components/Airport/displayaircraft";
import InvalidPage404component from "./components/InvalidPage/404page"
import DisplayTransaction from "./components/Transaction/displaytransaction";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/login" component={HomeComponent}/>
      <Route exact path="/signup" component={SignUpComponent}/>
      <PrivateRoute exact path="/airports" component={DisplayAirports}/>
      <PrivateRoute exact path="/aircrafts" component={DisplayAircrafts}/>
      <PrivateRoute exact path="/transactions" component={DisplayTransaction}/>
      <PrivateRoute exact path="/chart" component={Chart}/>
      <PrivateRoute exact path="/dashboard" component={DashboardContent}/>
      <PrivateRoute exact path="/transaction" component={AddTransaction}/>
      <PrivateRoute exact path="/airport" component={AirportController}/>
      <PrivateRoute exact path="/aircraft" component={AircraftController}/>
      <PrivateRoute exact path="/logout" component={LogoutComponent}/>
      <PrivateRoute exact path="/report" component={ReportComponent}/>
      <Route exact path="*" component={InvalidPage404component}/>
  </Switch>
  );
}

export default App;
