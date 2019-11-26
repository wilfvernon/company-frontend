import React, { Component } from 'react'
import NewEventInfoScene from '../components/NewEventInfoScene'
import NewEventDescScene from '../components/NewEventDescScene'
import PreferredJobScene from '../components/PreferredJobScene'
import { connect } from 'react-redux'
import { FFXIV_API_BASE_URL, RAILS_BASE_URL } from '../index'
import './css/newEventModal.css'

class NewEventModal extends Component {

    state={
        scene: 1,
        name: "",
        start: "",
        end: "",
        date: "",
        location: "",
        purpose: "Progression",
        category: "raids",
        community: "",
        content: "",
        description: "",
        character: ""
    }


    setEvent = (key, value) => {
        this.setState({ 
            [key]: value
        })
    }

    getScene = () => {
        const { scene, name, start, end, date, location, purpose, category, community, content, character } = this.state
        switch (scene) {
            case 1:
                return <NewEventInfoScene 
                    event={{ name, start, end, date, location, purpose, category, community, content, character }} 
                    setEvent={this.setEvent} 
                    setContent={this.setContent}
                />
            case 2:
                return <NewEventDescScene description={this.state.description} setEvent={this.setEvent}/>
            case 3:
                return <PreferredJobScene/>
            default:
            break;
        }
    }

    incrementScene = () => {
        this.setState(prevProps=>({
            scene: prevProps.scene + 1
        }));
    }

    decrementScene = () => {
        this.setState(prevProps=>({
            scene: prevProps.scene - 1
        }));
    }

    eventBody = () => {
        const { name, start, end, date, location, purpose, category, community, content, description, character } = this.state 
        return {
            event: { name, start, end, date, location, purpose, category, description },
            eventCharacterId: character.id,
            eventCommunityId: community.id,
            eventContentId: content.id
        }
    }

    postEvent = () => {
        fetch(RAILS_BASE_URL + "/events", {
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(this.eventBody())
        }).then(res=>res.json)
        .then(console.log)
    }

    bannerStyle = () => ({
        backgroundImage: this.state.content? `url(${FFXIV_API_BASE_URL + this.state.content.image})`:"url(https://i.pinimg.com/originals/4a/67/7c/4a677c3617106a04e8e2fe2a3809fa4b.jpg)",
        backgroundSize: "cover"
    })

    render(){
        return (
            <div>
                <div className="banner" style={this.bannerStyle()}>
                    <h1>{this.state.content?this.state.content.name:"New Event"}</h1>
                </div>
                {this.getScene()}
                <div className="buttons-container">
                    {this.state.scene !==2?<button onClick={this.incrementScene}>Next</button>:<button onClick={this.postEvent}>Create Event</button>}
                    {this.state.scene !==1?<button onClick={this.decrementScene}>Back</button>:null}
                </div>
            </div>
        )
    }
}

const msp = (state) => ({
    allContent: state.content.all,
    userCharacter: state.characters.accountPrimary
})

export default connect(msp)(NewEventModal)