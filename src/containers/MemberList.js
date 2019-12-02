import React from 'react';
import { connect } from 'react-redux'
import './css/cardList.css'
import MemberListItem from '../components/MemberListItem';
 
const MemberList = (props) => {

    const { members, admins } = props

    const renderAdmins = () => {
        return admins.map(admin=>{
           return( 
           <MemberListItem {...admin} isAdmin={true} key={admin.id}/>
           )
        })
    }

    const renderMembers = () => {
        return members.map(member=>{
           return( 
            <MemberListItem {...member} isAdmin={false} key={member.id}/>
           )
        })
    }

    return (
        <div className="card-container">
            <h2>Members</h2>
            <hr/>
            <div className="card-list">
                {renderAdmins()}
                {renderMembers()}
            </div>
        </div>
    );
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp)(MemberList)