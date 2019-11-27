import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { newAccountModal } from '../redux/actions'
import './css/login.css'

class Login extends Component {

    render(){
    return (
        <div className={this.props.authenticated === false ?"login-page-invalid":"login-page"}>
            <div className="login-form">
                <img src="/company_clear.png" alt="company"/>
                <LoginForm />
                <div id="sign-up-text">
                    <p>Don't have an account?</p>
                    <p onClick={this.props.newAccountModal} id="sign-up-link">Click here to sign up!</p>
                </div>
            </div>
        </div>
        )
    }
}

const msp = (state) => ({
    authenticated: state.account.authenticated
})

export default connect(msp, { newAccountModal })(Login)