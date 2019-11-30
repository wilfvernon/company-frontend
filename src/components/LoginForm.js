import React, { Component } from 'react';
import { connect } from 'react-redux'
import { validateUsername } from '../redux/actions'
import './css/loginForm.css'

class LoginForm extends Component {

    state={
        userInput: ""
    }

    handleChange = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.validateUsername(this.state.userInput)
    }

    render(){
        return(
            <div>
               <form className="login-form-form" onSubmit={this.handleSubmit}>
                   <input name="username" placeholder="username" value={this.state.userInput} type="text" onChange={this.handleChange}/>
                   <input type="submit" value="Log In"/>
               </form>
               {this.props.authenticated === false ? <h4 id="auth-fail-text">Uh-oh! No account by that name!</h4>:null}
               {this.props.activeUser?<h4>Welcome {this.props.activeUser.username}</h4>:null}
            </div>
        )
    }
}

const msp = (state) => ({
    activeUser: state.account.activeUser,
    authenticated: state.account.authenticated
})

export default connect(msp, { validateUsername })(LoginForm)