import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/eventShowDetails.css'
import {deleteEventModal, newEventModal} from '../redux/actions.js'
 
const EventShowDetails = (props) => {
    
    const { event, content } = props
    const { Name, ClassJobLevelRequired, ItemLevelRequired, Description } = content["ContentFinderCondition"]

    const renderCommunityImage = () => {
        const {community_image} = event
        return(
        <Fragment>
            <img style={{zIndex: 2}} src={community_image[0]} alt={`${event.community}-img`}/>
            <img style={{zIndex: 3}} src={community_image[1]} alt={`${event.community}-img`}/>
            <img style={{zIndex: 4}} src={community_image[2]} alt={`${event.community}-img`}/>
        </Fragment>
        )
    }

    const renderRequirements = () => {
        return(
            <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                <h3>Lvl {ClassJobLevelRequired}</h3>
                <h3>Minimum iLvl {ItemLevelRequired}</h3>
            </div> 
        )    
    }

    const deleteEvent = () => {
        props.deleteEventModal(event)
    }
    
    return (
        <div id="event-detail-box">
            <div id="event-detail-content">
                <div id="event-info">
                    <h2>
                        <Link to={"/communities/" + event.community_id}>
                        <span className="community-image">{renderCommunityImage()}</span>
                        <span style={{marginLeft: "5vh"}}>{event.community}</span>
                        </Link>
                    </h2>   
                    <h3>Organised by {event.organiser.character.name}</h3>                
                    <h3>Goal: {event.purpose}</h3>
                    <p>{event.description}</p>
                    {event.organiser.character.id === props.activeCharacter.id ?
                        <Fragment>
                            <button onClick={deleteEvent}>Delete</button>
                            <button onClick={()=>props.newEventModal(props.event, "PATCH")}>Edit</button>
                        </Fragment>
                        :
                        null
                    }
                </div>
                <div id="content-info-box">
                    <div id="content-info">
                        <h2>Duty</h2>
                        <h3>{Name}</h3>
                        <h3><img src={event.icon}alt="event-icon"/> {event.category}</h3>
                        {renderRequirements()}
                        <p>{Description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
}) 
 
export default connect(msp, {deleteEventModal, newEventModal})(EventShowDetails);