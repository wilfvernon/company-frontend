import React, { Component } from 'react';
import './css/eventLineupCard.css'
import { RAILS_BASE_URL } from '../index'
import { connect } from 'react-redux'
 
class EventLineupCard extends Component {

    state={
        selectedJob: null
    }

    isOrganiser=()=>{
        return this.props.activeCharacter.id === this.props.organiserId
    }

    componentDidMount=()=>{
        fetch(RAILS_BASE_URL +"event_characters/" + this.props.id + "/selected_job")
        .then(res=>res.json())
        .then(selectedJob=>this.setState({selectedJob}))
    }

    selectJob=(job)=>{
        if(this.isOrganiser()){
            fetch(RAILS_BASE_URL + "event_character_jobs/" + job.id, {method: "PATCH"})
            if(this.state.selectedJob && this.state.selectedJob.id===job.job.id){this.setState({selectedJob: null})}
            else{this.setState({selectedJob: job.job})}
        }
    }

    cardStyle=()=>{
        return this.isOrganiser()?"org-event-lineup-card":"event-lineup-card"
    }

    iconStyle=(job)=>{
        let c = (this.state.selectedJob?(job.job.id===this.state.selectedJob.id?"job-icon-lineup-selected":"job-icon-lineup"):"job-icon-lineup")
        if(this.isOrganiser()) c = "org-" + c
        return c
    }

    stopProp=(e)=>{
        e.persist();
        e.stopPropagation()
    }

    renderJobs=()=>{ 
        console.log(this.props.jobs)  
        const jobs = this.props.jobs.filter(job=>job.job.role === this.props.slot.slice(0, (this.props.slot.length-1)))
        console.log(jobs)
        return jobs.map(job=>{
            return (
                <img 
                    className={this.iconStyle(job)}
                    key={job.id} 
                    src={job.job.icon} 
                    alt="job-icon"
                    onClick={()=>this.selectJob(job)}
                />
            )
    })
    }
    render() { 
        return (
            <div className="event-lineup-card-container">
                <div onClick={this.stopProp} className={(this.cardStyle()+(this.props.position?`-${this.props.position}`:""))}>
                    <div className="event-lineup-card-info">
                        <h3>{this.props.character.name}</h3>
                        <div>{this.renderJobs()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
 
const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
}) 

export default connect(msp)(EventLineupCard);