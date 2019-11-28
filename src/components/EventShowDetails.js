import React from 'react';
import { Link } from 'react-router-dom'
 
const EventShowDetails = (props) => {
    
    const { event } = props

    return (
        <div>
            <h2>Community: <Link to={"/communities/" + event.community_id}>{event.community}</Link></h2>
            <h3>Type: {event.category}</h3>
            <h3>Goal: {event.purpose}</h3>
        </div>
    );
}
 
export default EventShowDetails;