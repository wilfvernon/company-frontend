import React, { Component } from 'react';
import { connect } from 'react-redux';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { RAILS_BASE_URL } from '../index'
 
const fetchAccount = (name) => fetch(RAILS_BASE_URL + "accounts/validate_new/" + name)


const debouncedFetchAccount = AwesomeDebouncePromise(fetchAccount, 500)

class NewAccountUsernameScene extends Component {

    state={
        usernameInput: "",
        username: ""
    }
    


    handleChange = async event => {
        event.persist();
        this.setState({usernameInput: event.target.value})     
        let valid = await debouncedFetchAccount(event.target.value)
        valid = await valid.json()
        this.props.setParentState({ valid: valid["valid"] })
    }

    render() { 
        console.log(this.state)
        return (
            <form>
                <input name="username" type="text" value={this.state.usernameInput} onChange={this.handleChange}/>
            </form>
        );
    }
}
 
export default connect()(NewAccountUsernameScene);