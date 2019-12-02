import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventShowHeader from '../components/EventShowHeader'
import EventShowDetails from '../components/EventShowDetails'
import MemberList from './MemberList'
import './css/eventShow.css'
import { RAILS_BASE_URL, FFXIV_API_BASE_URL } from '../index'

 
class EventShow extends Component {

    state = {
        event: null,
        members: null,
        content: null,
        view: "details",
        isMember: false
    }

    componentDidMount=()=>{
        fetch(RAILS_BASE_URL + "events/" + this.props.id)
        .then(res=>res.json())
        .then(res=>{this.setState({
            event: res,
            members: res.members,
            isMember: res.members.map(member=>member.id).includes(this.props.activeCharacter.id)
        })
        return res.content})
        .then(content=>{
            fetch(FFXIV_API_BASE_URL + "instancecontent/" + content.api_id)
            .then(res=>res.json())
            .then(content=>this.setState({ content }))
        })
    }

    joinEvent = () => {
        fetch(RAILS_BASE_URL + 'event_characters', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_id: this.state.event.id,
                character_id: this.props.activeCharacter.id
            })
        }).then(this.setState({
            members: [...this.state.members, this.props.activeCharacter]
        }))
    }

    changeView = (view) => {
        this.setState({view})
    }

    renderView = () => {
        switch (this.state.view) {
            case "posts":
                return (
                    <h1>Posts</h1>
                )
            case "details":
                return (
                <EventShowDetails 
                    content={this.state.content} 
                    event={this.state.event}
                />
                )
            case "members":
                return (
                    <h1>Members</h1>
                )
            default:
                break;
        }
    }

    render() { 
        console.log(this.state)
        return (
            <div className="event-show-page">
            {this.state.content ?
            <Fragment>
                <div className="event-show-header-container">
                    <EventShowHeader 
                        content={this.state.content} 
                        event={this.state.event}
                    />
                </div>
                <div className="event-show-main-container">
                    <div className="event-show-main">
                        <div id="event-show-datetime-div">
                            <p>
                               {this.state.event.time.dateString} | {this.state.event.time.start_time}-{this.state.event.time.end_time}
                            </p>                            
                            <div id="event-show-view-buttons">
                                <button 
                                    id="post-button" 
                                    className={this.state.view==="posts"?"active-event-view-button":"inactive-event-view-button"}
                                    onClick={this.state.view==="posts"?null:()=>this.changeView("posts")}
                                    >
                                    <i className="material-icons">forum</i>
                                </button>   
                                <button 
                                    id="details-button" 
                                    className={this.state.view==="details"?"active-event-view-button":"inactive-event-view-button"}
                                    onClick={this.state.view==="details"?null:()=>this.changeView("details")}
                                    >
                                    <i className="material-icons">list</i>
                                </button>
                                <button 
                                    id="members-button" 
                                    className={this.state.view==="members"?"active-event-view-button":"inactive-event-view-button"}
                                    onClick={this.state.view==="members"?null:()=>this.changeView("members")}
                                    >
                                    <i className="material-icons">people</i>
                                </button>                                             
                            </div>                                                            
                        </div>
                        {this.renderView()}
                    </div>
                    <div id="event-members-list">
                    <MemberList 
                        admins={[this.state.event.organiser]} 
                        members={this.state.members.filter(member=>member.id!==this.state.event.organiser.id)} 
                        join={this.joinEvent}
                        isMember={this.state.isMember}
                    />
                    </div>
                </div>
            </Fragment>
            :
            <img id="loading" src="/company_loader.png" alt="loader"/>}
            </div>
        );
    }
}

    const msp=(state)=>({
        activeCharacter: state.characters.accountPrimary
    })
 
export default connect(msp)(EventShow);