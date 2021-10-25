import { Route, Switch } from "react-router";
import HomeComponent from './components/Home/homecomponent';
import SignUpComponent from './components/Auth/signupcomponent';
import LoginComponent from './components/Auth/logincomponent'
import WelcomeComponent from '../src/components/Welcome/welcome';
import {PrivateRoute} from './components/Route/PrivateRoute'
import AirportController from "./components/Airport/airport";
import AircraftController from "./components/Airport/aircraft";
import LogoutComponent from "./components/Auth/logout";
import DashboardContent from "./components/Dashboard/dashboard"


function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/login" component={LoginComponent}/>
      <Route exact path="/signup" component={SignUpComponent}/>
      <Route exact path="/dashboard" component={DashboardContent}/>
      <PrivateRoute exact path="/welcome" component={WelcomeComponent}/>
      <PrivateRoute exact path="/airport" component={AirportController}/>
      <PrivateRoute exact path="/aircraft" component={AircraftController}/>
      <PrivateRoute exact path="/logout" component={LogoutComponent}/>
      <Route >
      </Route>
  </Switch>
  );
}

export default App;
