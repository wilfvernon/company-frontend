import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/newEventScene.css'
 
class NewEventDescScene extends Component {
    render() { 
        return (
            <div className="form-container">
                <label>Description</label>
                <textarea id="description" name="description" placeholder="Put a description here"/>
            </div>
        );
    }
}
 
export default connect()(NewEventDescScene);