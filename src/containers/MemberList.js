import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import './css/cardList.css'
import MemberListItem from '../components/MemberListItem';
 
const MemberList = (props) => {

    const { members, admins, isMember, join, adminName } = props

    const handleClick = (event) => {
        event.persist();
        event.target.disabled = true
        join()
    }

    const renderAdmins = () => {
        return admins.map(admin=>{
           return( 
           <MemberListItem {...admin} isAdmin={true} key={admin.id} adminName={adminName}/>
           )
        })
    }

    const renderMembers = () => {
        return members.map(member=>{
           return( 
            <MemberListItem {...member} isAdmin={false} key={member.id} adminName={adminName}/>
           )
        })
    }

    return (
        <div className="card-container">
            <h2>Members</h2>
            {admins && members?
            <Fragment>
            <hr/>
            {isMember?null:
                <button 
                onClick={handleClick} 
                disabled={false} 
                id="community-join-button">
                    Apply to Join
                </button>
            }        
            <div className="card-list">
                {renderAdmins()}
                {renderMembers()}
            </div>
            </Fragment>
            :
            <img className="loading" src="/company_clear.png" alt="loading"/>
        }
        </div>
    );
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp)(MemberList)