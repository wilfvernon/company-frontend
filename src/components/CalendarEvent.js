import React from 'react';
import './css/calendarEvent.css'

const CalendarEvent = (props) => {
    console.log(props)
    return (
        <div className="cal-event-container">
            <img src={props.event.fullEvent.icon} alt="event-icon"></img>
            <div className="cal-event-details">
                <h5>{props.event.title}</h5>
                <h6>{props.event.fullEvent.time.start_time} - {props.event.fullEvent.time.end_time}</h6>
            </div>
        </div>
    );
}
 
export default CalendarEvent;