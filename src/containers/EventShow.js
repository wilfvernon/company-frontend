import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventShowHeader from '../components/EventShowHeader'
import EventShowDetails from '../components/EventShowDetails'
import MemberList from './MemberList'
import { joinEventModal, clearNewEventMember, clearNewSlotRender } from '../redux/actions'
import './css/eventShow.css'
import { RAILS_BASE_URL, FFXIV_API_BASE_URL } from '../index'
import PostContainer from './PostContainer';
import EventLineup from './EventLineup'

 
class EventShow extends Component {

    state = {
        event: null,
        members: null,
        content: null,
        view: "details",
        isMember: false,
        threads: [],
        disabled: false
    }

    fetchEvents = () =>{
        return fetch(RAILS_BASE_URL + "events/" + this.props.id)
        .then(res=>res.json())
        .then(res=>{this.setState({
            event: res,
            members: res.members,
            isMember: res.members.map(member=>member.character.id).includes(this.props.activeCharacter.id)||res.organiser.character.id===this.props.activeCharacter.id
        })
        return res.content})
    }

    fetchContent = (content) =>{
        fetch(FFXIV_API_BASE_URL + "instancecontent/" + content.api_id)
        .then(res=>res.json())
        .then(content=>this.setState({ content }))
    }

    fetchThreads = () =>{
        fetch(RAILS_BASE_URL + "events/" + this.props.id + "/threads")
        .then(res=>res.json())
        .then(threads=>this.setState({threads}))
    }

    componentDidMount=()=>{
        this.fetchEvents()
        .then(this.fetchContent)
        this.fetchThreads()
        this.interval = setInterval(this.fetchThreads, 8000)
    }

    componentWillUnmount=()=>{
        clearInterval(this.interval)
        this.props.clearNewEventMember()
        this.props.clearNewSlotRender()
    }

    disable = () =>{
        this.setState({disabled: true})
    }

    joinEvent = () => {
        this.props.joinEventModal(this.state.event, this.state.content["Banner"], this.disable)
    }

    changeView = (view) => {
        this.setState({view})
    }

    renderView = () => {
        switch (this.state.view) {
            case "posts":
                return (
                    <PostContainer
                        threads={this.state.threads}
                        targetId={this.state.event.id}
                        target="event"
                    />
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
                    <EventLineup
                        organiser={this.state.event.organiser}  
                        members={[...this.state.members, this.state.event.organiser]}
                    />
                )
            default:
                break;
        }
    }

    render() { 
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
                        members={this.state.members.filter(member=>member.character.id!==this.state.event.organiser.id)} 
                        join={this.joinEvent}
                        isMember={this.state.isMember}
                        adminName="Organiser"
                        disabled={this.state.disabled}
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
 
export default connect(msp, {joinEventModal, clearNewEventMember, clearNewSlotRender})(EventShow);