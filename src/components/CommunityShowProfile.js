import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/communityShowProfile.css'
 
class CommunityShowProfile extends Component {
    render() { 
        const { community, api_community } = this.props
        return (
            <div className="community-show-profile">
                <div id="api-profile">
                    <h2>{api_community?api_community["Slogan"]:null}</h2>
                </div>
            </div>
        );
    }
}
 
export default connect()(CommunityShowProfile);