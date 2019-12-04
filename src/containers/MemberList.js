import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import './css/cardList.css'
import MemberListItem from '../components/MemberListItem';
 
const MemberList = (props) => {

    const { members, admins, isMember, join, adminName } = props

    const handleClick = () => {
        join()
    }


    const renderAdmins = () => {
        return admins.map(admin=>{
           return( 
           <MemberListItem {...admin} isAdmin={true} key={admin.character?admin.character.id:admin.id} adminName={adminName}/>
           )
        })
    }

    const renderMembers = () => {
        return members.map(member=>{          
           return( 
            <MemberListItem {...member} isAdmin={false} key={member.character?member.character.id:member.id} adminName={adminName}/>
           )
        })
    }

    const renderNewMembers=()=>{
        return <MemberListItem {...props.new} isAdmin={false} key={props.new.character.id} adminName={adminName}/>
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
                disabled={props.disabled} 
                id="community-join-button">
                    Apply to Join
                </button>
            }        
            <div className="card-list">
                {renderAdmins()}
                {renderMembers()}
                {props.new?renderNewMembers():null}
            </div>
            </Fragment>
            :
            <img className="loading" src="/company_clear.png" alt="loading"/>
        }
        </div>
    );
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary,
    new: state.characters.newEventMember
})

export default connect(msp)(MemberList)