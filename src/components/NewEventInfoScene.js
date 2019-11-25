import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/newEventScene.css'
 
class NewEventInfoScene extends Component {

    handleChange = (event) => {
        this.props.setEvent(event.target.name, event.target.value)
    }

    handleDateChange = (value, key) => {
       this.props.setEvent(key, value)
    }

    handleContentChange = (event) => {
        const id = event.target.value
        const content = this.props.allContent.all.find(content => content.id === +(id))
        this.props.setEvent("content", content);
    }

    renderContentOptions = () => {
        return this.props.allContent[this.props.event.category].map(content =>{
            return <option key={content.id} value={content.id}>{content.name}</option>
        })
    }

    render() { 
        const { name, start, end, date, location, category, purpose, community, content } = this.props.event
        return (
            <form className="form-container">
                <div className="form">
                    <div className="form-column">
                        <div>
                            <label>Event Name:</label>
                            <input name="name" type="text" value={name} placeholder="Title" onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <label>Start Time:</label>
                            <input name="start" type="time" value={start} onChange={event=>this.handleDateChange(event.target.value, "start")} required/>
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input name="end" type="time" value={end} onChange={event=>this.handleDateChange(event.target.value, "end")} required/>
                        </div>
                        <div>
                            <label>Date:</label>
                            <input name="date" type="date" value={date} onChange={event=>this.handleDateChange(event.target.value, "date")} required/>
                        </div>
                        <div>
                            <label>Location:</label>
                            <input name="location" type="text" value={location} onChange={this.handleChange} placeholder="Category"/>
                        </div>
                    </div>
                    <div className="form-column">
                        <div>
                            <label>Goal:</label>
                            <select name="purpose" value={purpose} onChange={this.handleChange} required>
                                <option value="Progression">Progression</option>
                                <option value="Clear">Clear</option>
                                <option value="Farm">Farm</option>
                            </select>
                        </div>
                        <div>
                            <label>Content Type:</label>
                            <select name="category" value={category} onChange={this.handleChange} required>
                                <option value="raids">Raid</option>
                                <option value="savageRaids">Savage Raid</option>
                            </select>
                        </div>
                        <div>
                            <label>Content:</label>
                            <select name="content" value={content?content.id:""} onChange={this.handleContentChange}>
                                <option>--</option>
                                {this.renderContentOptions()}
                            </select>
                        </div>
                        <div>
                            <label>Community:</label>
                            <select name="community" value={community} onChange={this.handleChange} required>
                                <option value="None">None</option>
                                <option value="Grassroots">Grassroots</option>
                            </select> 
                        </div>
                        <div><label style={{color: "rgb(226, 221, 221)"}}>Good job finding this</label></div>
                    </div>
                </div>
            </form>
        );
    }
}

const msp = (state) => ({
    allContent: state.content
})
 
export default connect(msp)(NewEventInfoScene);