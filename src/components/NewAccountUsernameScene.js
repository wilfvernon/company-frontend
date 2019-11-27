import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class NewAccountUsernameScene extends Component {

    handleChange = (event) => {
        event.persist();
        this.props.setParentState({
            [event.target.name]: event.target.value
        })
    }

    render() { 
        return (
            <form>
                <input name="username" type="text" value={this.props.username} onChange={this.handleChange}/>
            </form>
        );
    }
}
 
export default connect()(NewAccountUsernameScene);