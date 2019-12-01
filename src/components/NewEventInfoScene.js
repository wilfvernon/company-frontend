import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/newEventScene.css'
import { RAILS_BASE_URL } from '../index'
 
class NewEventInfoScene extends Component {

    state = {
        communities: []
    }

    componentDidMount=()=>{
        this.fetchCommunityOptions()
    }

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

    handleCharacterChange = (event) => {
        const id = event.target.value
        const character = this.props.userCharacters.find(character => character.id === +(id))
        this.props.setEvent("character", character)
    }

    handleCommunityChange = (event) => {
        const id = event.target.value
        const community = this.props.userCommunities.find(community => community.id === +(id))
        this.props.setEvent("community", community)
    }

    renderContentOptions = () => {
        return this.props.allContent[this.props.event.category].map(content =>{
            return <option key={content.id} value={content.id}>{content.name}</option>
        })
    }

    renderCharacterOptions = () => {
        return this.props.userCharacters.map(character =>{
            return <option key={character.id} name={character.id} value={character.id}>{character.name}</option>
        })
    }

    fetchCommunityOptions = () => {
        fetch(RAILS_BASE_URL + "characters/" + this.props.event.character.id + "/communities")
        .then(res=>res.json())
        .then(comms=> { this.setState({
                    communities: comms
                })
            }
        )
    }

    renderCommunityOptions = () => {
        return this.state.communities.map(community =>{
            return <option key={community.id} value={community.id}>{community.name}</option> 
        })     
    }

    render() { 
        const { name, start, end, date, location, category, purpose, community, content, character } = this.props.event
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
                            <input name="location" type="text" value={location} onChange={this.handleChange} placeholder="Location"/>
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
                            <label>Character:</label>
                            <select name="character" value={character.id} onChange={this.handleCharacterChange} required>
                                {this.renderCharacterOptions()}
                            </select>
                        </div>
                        <div>
                            <label>Community:</label>
                            <select name="community" value={community.id} onChange={this.handleCommunityChange} required>
                                <option value="None">None{character?null:" (Please Select a Character)"}</option>
                                {character?
                                    this.state.communities.length?
                                        this.renderCommunityOptions()
                                        :
                                        this.fetchCommunityOptions()
                                    : null
                                }
                                
                            </select> 
                        </div>                      
                    </div>
                </div>
            </form>
        );
    }
}

const msp = (state) => ({
    allContent: state.content,
    userCharacters: state.characters.account,
    userCommunities: state.communities.account
})
 
export default connect(msp)(NewEventInfoScene);