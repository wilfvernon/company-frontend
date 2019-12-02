import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { eventPostAction } from '../redux/actions'
import './css/upcomingEventCard.css'
import { RAILS_BASE_URL } from '../index'

class UpcomingEventCard extends Component {

    state={
        disabled: false
    }

    joinEvent = () => {
        fetch(RAILS_BASE_URL + 'event_characters', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_id: this.props.event.id,
                character_id: this.props.activeCharacter.id
            })
        }).then(res=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({disabled: true})
            this.props.eventPostAction(res.event)
        })
    }
    render(){
        const { event, activeCharacter} = this.props
        const { organiser, time, id, name, description, content, members } = event
        return (
            <div className="upcoming-event-card">
                <div className="ue-card-header">
                    <img src={organiser.profile_image} alt={organiser.name + "-img"}/>
                    <div>
                    <Link to={"/events/" + id}>
                        <h3>{name}</h3>
                    </Link>
                        <h4>{time.start_time}-{time.end_time}</h4>
                        <h5>{organiser.name}</h5>
                    </div>
                </div>
                <div className="ue-card-body">
                    <p>{description}</p>
                    <p>{content.name}</p>
                    {members.map(member=>member.id).includes(activeCharacter.id) || this.state.disabled?
                    <button disabled={true}>Already Joined</button>
                    :
                    <button onClick={this.joinEvent}>Join</button>}
                </div>
            </div>
        )
    }
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp, { eventPostAction })(UpcomingEventCard)
