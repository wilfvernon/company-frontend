import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/upcomingEvents.css'
import { fetchUpcomingEvents } from '../redux/actions'
import { Link } from 'react-router-dom'
 
class UpcomingEvents extends Component {

    componentDidMount(){
        const { fetchUpcomingEvents, currentUser } = this.props
        fetchUpcomingEvents(currentUser.id)
    }

    renderEvents = () => {
        return this.props.events.map(event=>{
            return(
                <Link to={"/events/" + event.id}>
                    <div className="upcoming-event-card">
                        <h1>{event.name}</h1>
                        <p>{event.organiser.name}</p>
                    </div>
                </Link>
            )
        })
    }

    render() { 
        console.log(this.props)
        return (
            <div className="upcoming-events-container">
                {this.props.events?this.renderEvents():"Loading"}
            </div>
        );
    }
}

const msp = (state) => ({
    currentUser: state.account.activeUser,
    events: state.events.upcoming
})
 
export default connect(msp, { fetchUpcomingEvents })(UpcomingEvents);