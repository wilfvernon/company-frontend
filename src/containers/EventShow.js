import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import EventShowHeader from '../components/EventShowHeader'
import EventShowDetails from '../components/EventShowDetails'
import MemberList from '../components/MemberList'
import { RAILS_BASE_URL } from '../index'

 
class EventShow extends Component {

    state = {
        event: null,
        members: null,
        content: null
    }

    componentDidMount=()=>{
        fetch(RAILS_BASE_URL + "events/" + this.props.id)
        .then(res=>res.json())
        .then(res=>this.setState({
            event: res,
            members: res.members,
            content: res.content
        }))
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

    render() { 
        console.log(this.state)
        return (
            <div>
            {this.state.event ?
            <Fragment>
                <EventShowHeader content={this.state.content} event={this.state.event}/>
                <EventShowDetails content={this.state.content} event={this.state.event}/>
                <MemberList members={this.state.members} join={this.joinEvent}/>
            </Fragment>
            :
            <h1>Loading</h1>}
            </div>
        );
    }
}

    const msp=(state)=>({
        activeCharacter: state.characters.accountPrimary
    })
 
export default connect(msp)(EventShow);