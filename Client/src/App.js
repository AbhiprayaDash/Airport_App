import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router";
import HomeComponent from './components/homecomponent';
import SignUpComponent from './components/signupcomponent';
import LoginComponent from './components/logincomponent'
function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent}/>
      <Route exact path="/login" component={LoginComponent}/>
      <Route exact path="/signup" component={SignUpComponent}/>
      <Route >
      </Route>
  </Switch>
  );
}

export default App;
