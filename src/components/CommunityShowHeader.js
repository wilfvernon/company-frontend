import React, { Component, Fragment } from 'react';
import './css/communityShowHeader.css'
 
class CommunityShowHeader extends Component {

    renderCommunityImage = () => {
        const {community} = this.props
        return(
        <Fragment>
            <img style={{zIndex: 2}} src={community.image_base} alt={`${community.name}-img`}/>
            <img style={{zIndex: 3}} src={community.image_mid} alt={`${community.name}-img`}/>
            <img style={{zIndex: 4}} src={community.image_top} alt={`${community.name}-img`}/>
        </Fragment>
        )
    }

    handleClick = (event) => {
        event.persist();
        event.target.disabled = true
        this.props.join()
    }

    render() { 
        const { community, api_community, isMember } = this.props
        console.log(isMember)
        return (
            <div className="community-show-header">
                <div className="community-img">
                    {api_community?this.renderCommunityImage()
                    :<img src={community.image_base} alt={`${community.name}-img`}/>}
                </div>
                <div className="community-show-fulltitle">
                    <div>
                        <h1 className="community-show-title">{community.name}</h1>
                    </div>
                    <hr/>
                    <div className="community-show-subheading">
                        <span id="server">{community.server}</span>
                    </div>
                </div>
                
                {isMember?null:
                <button onClick={this.handleClick} disabled={false} id="community-join-button">Apply to Join</button>}
            </div>
        );
    }
}
 
export default CommunityShowHeader;