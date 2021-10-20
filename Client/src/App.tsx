import { Route, Switch } from "react-router";
import HomeComponent from './components/homecomponent';
import SignUpComponent from './components/Auth/signupcomponent';
import LoginComponent from './components/Auth/logincomponent'
import WelcomeComponent from './components/welcome';
import {PrivateRoute} from './components/Route/PrivateRoute'
import AirportController from "./components/Airport/airport";
import AircraftController from "./components/Airport/aircraft";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/login" component={LoginComponent}/>
      <Route exact path="/signup" component={SignUpComponent}/>
      <PrivateRoute exact path="/welcome" component={WelcomeComponent}/>
      <PrivateRoute exact path="/airport" component={AirportController}/>
      <PrivateRoute exact path="/aircraft" component={AircraftController}/>
      <Route >
      </Route>
  </Switch>
  );
}

export default App;
