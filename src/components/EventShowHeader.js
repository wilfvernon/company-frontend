import React from 'react';
import { FFXIV_API_BASE_URL } from "../index"
 
const EventShowHeader = (props) => {
    const { event, content } = props
    console.log(props)

    const bannerStyle = () => ({
        backgroundImage: `url(${FFXIV_API_BASE_URL + content.image})`,
        backgroundSize: "cover"
    })
    return (
        <div>
            <h1>{event.name}</h1>
            <div className="banner" style={bannerStyle()}>
                <h1>{content.name}</h1>
            </div>
        </div>
    );
}
 
export default EventShowHeader;