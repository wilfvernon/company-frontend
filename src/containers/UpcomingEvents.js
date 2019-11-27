import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/upcomingEvents.css'
 
class UpcomingEvents extends Component {
    render() { 
        return (
            <div className="upcoming-events-container">
                <h1>Upcoming Events will go here</h1>
            </div>
        );
    }
}
 
export default connect()(UpcomingEvents);