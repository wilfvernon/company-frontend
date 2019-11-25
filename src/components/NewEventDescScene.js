import React, { Component } from 'react';
import './css/newEventScene.css'
 
class NewEventDescScene extends Component {

    handleInput = (event) => {
        this.props.setEvent(event.target.name, event.target.value)
    }

    render() { 
        console.log(this.props)
        return (
            <div className="form-container">
                <label>Description</label>
                <textarea id="description" name="description" placeholder="Put a description here" onChange={this.handleInput} value={this.props.description}/>
            </div>
        );
    }
}
 
export default NewEventDescScene;