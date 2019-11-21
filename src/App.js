import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import Test from './containers/Test'
import Login from './containers/Login'
import Calendar from './containers/Calendar'
import Menu from './containers/Menu'
import Header from './containers/Header'
import CommunityShow from './containers/CommunityShow'
import Modal from './containers/Modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"


class App extends React.Component {

  renderCommunityShow = (routerProps) => {
    return <CommunityShow id={routerProps.match.params.id}/>
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/">{this.props.userCharacter?<Redirect to="/calendar"/>:<Redirect to="/login"/>}</Route>

          <Route>
            {this.props.modal?<Modal/>:null}
            <Header/>
            <Menu/>

            <Switch>
              <Route path="/calendar" component={Calendar}/>
              <Route path="/test" component={Test}/>
              <Route path="/communities/:id" render={this.renderCommunityShow}/>
              <Route path="/events/:id" render={this.renderEventShow}/>
            </Switch>

          </Route>
        </Switch>
      </Router>
    );
    }
}


const msp = (state) => ({
  modal: state.modal.modal,
  userPrimaryCharacter: state.character.userPrimaryCharacter
})

export default connect(msp)(App);
