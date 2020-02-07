import React, { Component } from 'react';
import { connect } from 'react-redux';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { RAILS_BASE_URL } from '../index'
import './css/newAccountUsernameScene.css'
 
const fetchObj = (name) => ({
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body: JSON.stringify({ name })
})

const fetchAccount = (name) => fetch(RAILS_BASE_URL + "accounts/validate_new/", fetchObj(name))

const debouncedFetchAccount = AwesomeDebouncePromise(fetchAccount, 500)

class NewAccountUsernameScene extends Component {

    state={
        usernameInput: this.props.username,
        username: ""
    }
    


    handleChange = async event => {
        event.persist();
        this.setState({usernameInput: event.target.value})     
        let valid = await debouncedFetchAccount(event.target.value)
        valid = await valid.json()
        this.props.setParentState({ username: event.target.value, valid: valid["valid"] })
    }

    render() { 
        return (
                <input id="username-signup-form" name="username" type="text" value={this.state.usernameInput} onChange={this.handleChange}/>
        );
    }
}
 
export default connect()(NewAccountUsernameScene);