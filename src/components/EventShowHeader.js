import React from 'react';
import { FFXIV_API_BASE_URL } from "../index"
import './css/eventShowHeader.css'
 
const EventShowHeader = (props) => {
    const { event, content } = props


    const bannerStyle = () => ({
        backgroundImage: `url(${FFXIV_API_BASE_URL + content["Banner"]})`
    })
    return (
        <div className="event-show-header">
            <div id="event-show-banner" className="banner" style={bannerStyle()}>
                <div className="banner-text-div">
                    <h2>{event.name}</h2>
                    <h3>{content["ContentFinderCondition"]["Name"]}</h3>
                </div>
            </div>
        </div>
    );
}
 
export default EventShowHeader;