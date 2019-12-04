import React from 'react';
import './css/memberListItem.css'
 
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

    const {profile_image, name } = objectDeconstructor()
    const { isAdmin, adminName } = props
    return (
        <div className="member-list-item">
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
 
export default MemberListItem;