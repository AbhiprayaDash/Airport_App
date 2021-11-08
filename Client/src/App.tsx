import { Route, Switch } from "react-router";
import HomeComponent from './components/Home/homecomponent';
import SignUpComponent from './components/Auth/signupcomponent';
import LoginComponent from './components/Auth/logincomponent'
import {PrivateRoute} from './components/Route/PrivateRoute'
import AirportController from "./components/Airport/airport";
import AircraftController from "./components/Airport/aircraft";
import LogoutComponent from "./components/Auth/logout";
import DashboardContent from "./components/Dashboard/dashboard"
import AddTransaction from "./components/Transaction/addtransaction";
import ReportComponent from "./components/Report/report";
import Test from "./components/Auth/test";
import Chart from "./components/Charts/charts";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/login" component={LoginComponent}/>
      <Route exact path="/signup" component={SignUpComponent}/>
      <Route exact path="/test" component={Test}/>
      <PrivateRoute exact path="/chart" component={Chart}/>
      <PrivateRoute exact path="/dashboard" component={DashboardContent}/>
      <PrivateRoute exact path="/transaction" component={AddTransaction}/>
      <PrivateRoute exact path="/airport" component={AirportController}/>
      <PrivateRoute exact path="/aircraft" component={AircraftController}/>
      <PrivateRoute exact path="/logout" component={LogoutComponent}/>
      <PrivateRoute exact path="/report" component={ReportComponent}/>
      <Route >
      </Route>
  </Switch>
  );
}

export default App;
