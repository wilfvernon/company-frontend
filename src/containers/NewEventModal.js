import React, { Component, Fragment } from 'react'
import NewEventInfoScene from '../components/NewEventInfoScene'
import NewEventDescScene from '../components/NewEventDescScene'
import NewEventConfirmedScene from '../components/NewEventConfirmedScene'
import ModalSubBanner from '../components/ModalSubBanner'
// import PreferredJobScene from '../components/PreferredJobScene'
import { connect } from 'react-redux'
import { eventPostAction, closeModal } from '../redux/actions'
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
        category: "Raids",
        community: "",
        content: "",
        description: "",
        character: "",
        errorKeys: [],
        postValid: null
    }

    componentDidMount=()=>{
        this.setState({character: this.props.userCharacter})
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
                return (
                <Fragment>
                    <NewEventInfoScene 
                        event={{ name, start, end, date, location, purpose, category, community, content, character }} 
                        setEvent={this.setEvent} 
                        setContent={this.setContent}
                    />
                    <div className="buttons-container">
                        <button onClick={this.incrementScene}>Next</button>
                    </div>
                </Fragment>

                )
            case 2:
                return (
                <Fragment>
                    <NewEventDescScene 
                        description={this.state.description} 
                        setEvent={this.setEvent}
                    />
                    <div className="buttons-container">
                        <button onClick={this.postEvent}>Create Event</button>
                        <button onClick={this.decrementScene}>Back</button>
                    </div>
                </Fragment>
                )
            case 3:
                return (
                <Fragment>
                    <NewEventConfirmedScene />
                    <div className="buttons-container">
                        <button onClick={this.props.closeModal}>Close</button>
                    </div>
                </Fragment>
                )
            default:
            break;
        }
    }
    renderSubBanner = () => {
        switch (this.state.scene) {
            case 1:
                 if(!this.state.errorKeys.length){
                    return <ModalSubBanner class="sub-banner" text={()=><p>Fill in the details for your event:</p>}/>
                 }else{
                    this.renderErrors()
                    break;
                 }
            case 2:
                return <ModalSubBanner class="sub-banner" text={()=><p>Add a description:</p>}/>
            case 3:
                return (
                    this.state.postValid ? 
                    <ModalSubBanner class="success-banner" text={()=><p>Your event has been succesfully created!</p>}/>
                    : 
                    <ModalSubBanner class="failure-banner" text={()=><p>Something went wrong... Please close this form and try again.</p>}/>
                )
            default:
                break;
        }
    }
    renderErrors = () => {
        return (
        <ModalSubBanner 
            class="failure-banner" 
            text={()=><p>Some required fields are blank: <br/><span>{this.state.errorKeys.join(", ")}</span></p>}
        />
        )
    }

    checkFields = () => {
        const { name, start, end, date, purpose, category, content, character } = this.state
        switch (this.state.scene) {
            case 1:
                let arr = Object.entries({ name, start, end, date, purpose, category, content, character}).filter(([key, value])=>!!value===false)
                if(arr.length) arr = arr.map(([key, value])=>key)
                return arr
            case 2:
                return []
            default:
                break;
        }
    }

    incrementScene = () => {
        if(!this.checkFields().length){
        this.setState(prevProps=>({
            scene: prevProps.scene + 1,
            errorKeys: []
        }))} else {
            this.setState({
                errorKeys: this.checkFields()
            })
        }
    }

    decrementScene = () => {
        this.setState(prevProps=>({
            scene: prevProps.scene - 1
        }));
    }

    eventBody = () => {
        const { name, start, end, date, location, purpose, category, community, content, description, character } = this.state 
        return {
            event: { name, start, end, date, location, purpose, category, description, icon: this.getEventIcon() },
            eventCharacterId: character.id,
            eventCommunityId: community.id,
            eventContentId: content.id
        }
    }

    getEventIcon = () => {
        switch (this.state.category) {
            case "Savage Raids":
                return "https://xivapi.com/i/061000/061802.png"
            case "Raids":
                return "https://xivapi.com/i/061000/061802.png"
            default:
                break;
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
        }).then(res=>res.json())
        .then(res=>{
            if(res.valid){
                this.props.eventPostAction(res.event)
                this.setState({
                    postValid: true
                })
            } else {
                this.setState({
                    postValid: false
                })
            }
            this.incrementScene()
        })
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
                {this.state.errorKeys.length?this.renderErrors():this.renderSubBanner()}
                {this.getScene()}
            </div>
        )
    }
}

const msp = (state) => ({
    allContent: state.content.all,
    userCharacter: state.characters.accountPrimary
})

export default connect(msp, { eventPostAction, closeModal })(NewEventModal)