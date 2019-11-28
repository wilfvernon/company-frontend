import React from 'react';
import { connect } from 'react-redux'
 
const MemberList = (props) => {

    const renderMembers = () => {
        return props.members.map(member=>{
           return( 
           <li key={member.id}>
                <img src={member.profile_image} alt={member.name + "-img"}/>
                <p>{member.name}</p>
            </li>
           )
        })
    }

    return (
        <ul>
            MemberList
            {renderMembers()}
            {props.members.map(member=>member.id).includes(props.activeCharacter.id)?
            <button disabled={true}>Already Joined</button>
            :
            <button onClick={props.join}>Join</button>}
        </ul>
    );
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp)(MemberList)