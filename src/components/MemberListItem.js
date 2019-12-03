import React from 'react';
import './css/memberListItem.css'
 
const MemberListItem = (props) => {

    const {profile_image, name, isAdmin, adminName} = props

    return (
        <div className="member-list-item">
           <img src={profile_image} alt={name + "-img"}/>
            <div>
                <h3>{name}</h3>
                <h5>{isAdmin?adminName:null}</h5>
            </div>
        </div>
    );
}
 
export default MemberListItem;