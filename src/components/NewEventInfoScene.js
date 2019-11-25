import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class NewEventInfoScene extends Component {
    
    state={
        name: "",
        "start": "",
        end: "",
        date: "",
        location: "",
        category: "Progression",
        community: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange = (value, key) => {
       this.setState({
           [key]: value
       })
    }

    render() { 
        console.log(this.state)
        const { name, start, end, date, location, category, community } = this.state
        return (
            <div>
                <form>
                    <input name="name" type="text" value={name} placeholder="Title" onChange={this.handleChange} required="true"/>
                    <input name="start" type="time" value={start} onChange={event=>this.handleDateChange(event.target.value, "start")} required="true"/>
                    <input name="end" type="time" value={end} onChange={event=>this.handleDateChange(event.target.value, "end")} required="true"/>
                    <input name="date" type="date" value={date} onChange={event=>this.handleDateChange(event.target.value, "date")} required="true"/>
                    <input name="location" type="text" value={location} onChange={this.handleChange} placeholder="Category"/>
                    <select name="category" value={category} onChange={this.handleChange} required="true">
                        <option value="Progression">Progression</option>
                        <option value="Clear">Clear</option>
                        <option value="Farm">Farm</option>
                    </select>
                    <select name="community" value={community} onChange={this.handleChange} required="true">
                        <option value="None">None</option>
                        <option value="Grassroots">Grassroots</option>
                    </select> 
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

const msp = (state) => ({
    content: state.content.all
})
 
export default connect(msp)(NewEventInfoScene);