import React, { Component, Fragment } from 'react';
import './css/communityShowHeader.css'
 
class CommunityShowHeader extends Component {

    renderCommunityImage = () => {
        const {community} = this.props
        return(
        <Fragment>
            <img style={{zIndex: 0}} src={community.image_base} alt={`${community.name}-img`}/>
            <img style={{zIndex: 1}} src={community.image_mid} alt={`${community.name}-img`}/>
            <img style={{zIndex: 2}} src={community.image_top} alt={`${community.name}-img`}/>
        </Fragment>
        )
    }

    render() { 
        console.log(this.props)
        const { community, api_community } = this.props
        return (
            <div className="community-show-header">
                <div className="community-img">
                    {api_community?this.renderCommunityImage()
                    :<img src={community.image_base} alt={`${community.name}-img`}/>}
                </div>
                <h1 className="community-show-title">{community.name}</h1>
            </div>
        );
    }
}
 
export default CommunityShowHeader;