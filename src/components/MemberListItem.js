import React from 'react';
import './css/memberListItem.css'
import { clearLineupSlotAction, newSlotRender } from '../redux/actions'
import { connect } from 'react-redux'
import { RAILS_BASE_URL } from '../index'
 
const MemberListItem = (props) => {

    const renderJobs=()=>{
        return(
            <div>
                {props.jobs.map(job=><img className="member-list-job-icon" selected={job.selected} src={job.job.icon} key={job.job.id} alt="job-icon"/>)}
            </div>
        )
    }

    const objectDeconstructor=()=>{
    if(props.character) return props.character
    else return props
    }

    const handleClick=()=>{
        if(isSelectable()){
        fetch(RAILS_BASE_URL + "event_characters/slot/" + props.id, {
            method: "PATCH",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                slot: props.slot
            })
        })
        .then(res=>res.json())
        .then(res=>{
            props.newSlotRender(res)
            props.clearLineupSlotAction()
        })
        }
    }

    const isSelectable = () => {
        return props.jobs && props.jobs.map(job=>job.job.role.charAt(0)).includes(props.slot.charAt(0))
    }

    const {profile_image, name } = objectDeconstructor()
    const { isAdmin, adminName } = props
    return (
        <div onClick={handleClick} className={("member-list-item"+ (isSelectable()?"-selectable":""))}>
           <img className="member-list-profile-image" src={profile_image} alt={name + "-img"}/>
            <div className="member-list-info">
                <h3>{name}</h3>
                {props.jobs?
                    renderJobs()
                    :null
                }
                <h5>{isAdmin?adminName:null}</h5>
            </div>
        </div>
    );
}
 
const msp = (state) =>({
    slot: state.events.lineupSlot
})
export default connect(msp, { clearLineupSlotAction, newSlotRender })(MemberListItem);