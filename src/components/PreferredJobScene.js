import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './css/preferredJobScene.css'
 
class PreferredJobScene extends Component {

    handleClick=(job)=>{
        this.props.setJobs(job)
    }

    getDpsType=(type)=>{
        return this.props.jobs.dps.filter(job=>job.role_type===type)
    }

    renderJobs=(jobs)=>{
        return jobs.map(job=>{
            return (
                <img 
                    key={job.id}
                    onClick={()=>this.handleClick(job)} 
                    src={job.icon} 
                    alt="job-icon"
                    className={this.props.preferredJobs.includes(job)?"modal-job-icon-selected":"modal-job-icon"}
                />
            )
        })
    }

    renderRoles=()=>{
        const { tanks, healers } = this.props.jobs
        return(
            <Fragment>
                <div className="role-row">
                    <div className="job-icon-row">{this.renderJobs(healers)}</div>
                    <div className="job-icon-row">{this.renderJobs(tanks)}</div>
                </div>
                <div className="role-row">
                    <div className="job-icon-row">{this.renderJobs(this.getDpsType("ranged"))}</div>
                    <div className="job-icon-row">{this.renderJobs(this.getDpsType("melee"))}</div>
                </div>
                <div className="role-row">
                    <div className="job-icon-row">{this.renderJobs(this.getDpsType("magic"))}</div>
                </div>
            </Fragment>
        )
    }

    render() { 
        console.log(this.state)
        return (
            <div id="modal-job-icon-container">
                {this.renderRoles()}
            </div>
        );
    }
}

const msp=(state)=>({
    jobs: state.jobs
})
 
export default connect(msp)(PreferredJobScene);