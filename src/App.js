import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import Login from './containers/Login'
import UserCalendar from './containers/UserCalendar'
import Menu from './containers/Menu'
import Header from './containers/Header'
import CommunityShow from './containers/CommunityShow'
import EventShow from './containers/EventShow'
import Modal from './containers/Modal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"


class App extends React.Component {

  renderUserCalendar = (routerProps) => {
    return <UserCalendar history={routerProps.history}/>
  }

  renderCommunityShow = (routerProps) => {
    return <CommunityShow history={routerProps.history} key={routerProps.match.params.id} id={routerProps.match.params.id}/>
  }

  renderEventShow = (routerProps) => {
    return <EventShow key={routerProps.match.params.id} id={routerProps.match.params.id}/>
  }

  render(){
    return (
      <div className="App">
        <div id="stars-div">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
      <Router>
      {this.props.modal?<Modal/>:null}
        <Switch>
          <Route path="/login">{this.props.activeUser?<Redirect to="/calendar"/>:<Login/>}</Route>
          {this.props.activeUser? null : <Route path="/"><Redirect to="/login"/></Route>}
          <Route exact path="/">{this.props.activeUser?<Redirect to="/calendar"/>:<Redirect to="/login"/>}</Route>
          <Route>
            <Header/>
            {this.props.menu?<Menu/>:null}
            <div className="flex-main">
            <Switch>
              <Route path="/calendar" render={this.renderUserCalendar}/>
              <Route path="/communities/:id" render={this.renderCommunityShow}/>
              <Route path="/events/:id" render={this.renderEventShow}/>
            </Switch>
            </div>
          </Route>
        </Switch>
      </Router>
      </div>
    );
    }
}


const msp = (state) => ({
  modal: state.modal.modal,
  menu: state.modal.menu,
  activeUser: state.account.activeUser
})

export default connect(msp)(App);
