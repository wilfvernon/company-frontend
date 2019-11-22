import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

class Login extends Component {
    
    render(){
    return (
        <div>
            <h1>This is the Login page</h1>
            <LoginForm />
        </div>
        )
    }
}

export default Login