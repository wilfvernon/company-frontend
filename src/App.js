import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"


class App extends React.Component {

  

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path = "/"><Redirect to="/login"/></Route>

          <Route>
            <Menu/>

            <Switch>
              <Route path="/calendar" component={Calendar}/>
              <Route path="/test" component={Test}/>
            </Switch>

          </Route>
        </Switch>
      </Router>
    );
    }
}



export default App;
