import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { newAccountModal } from '../redux/actions'
import './css/login.css'

class Login extends Component {

    render(){
    return (
        <div className="login-page">
                <img id="company-front-image" src="/company_front_page_clear.png" alt="company-front"/>
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