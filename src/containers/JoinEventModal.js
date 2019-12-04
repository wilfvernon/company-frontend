import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalSubBanner from '../components/ModalSubBanner'
import PreferredJobScene from '../components/PreferredJobScene';
import { closeModal, eventPostAction, newEventMemberAction } from '../redux/actions'
import { FFXIV_API_BASE_URL, RAILS_BASE_URL } from '../index'
import './css/newEventModal.css'
 
class JoinEventModal extends Component {

    state={
        errorKeys: [],
        preferredJobs: []
    }

    bannerStyle = () => ({
        backgroundImage: `url(${FFXIV_API_BASE_URL + this.props.content_image})`,
        backgroundSize: "cover"
    })

    setJobs = (job) => {
        this.state.preferredJobs.includes(job)?
        this.setState(prevState=>({
            preferredJobs: prevState.preferredJobs.filter(j=>j!==job)
        }))
        :
        this.setState(prevState=>({
            preferredJobs: [...prevState.preferredJobs, job]
        }))
    }

    renderSubBanner=()=>{
        if(!this.state.errorKeys.length){
            return <ModalSubBanner class="sub-banner" text={()=><p>Pick which jobs you want to play:</p>}/>
        }else{
            return <ModalSubBanner class="failure-banner" text={()=><p>Please select at least one job</p>}/>
        }
    }

    joinEvent = () => {
        fetch(RAILS_BASE_URL + 'event_characters', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_id: this.props.event.id,
                character_id: this.props.activeCharacter.id,
                job_ids: this.state.preferredJobs.map(job=>job.id)
            })
        }).then(res=>res.json())
        .then((res)=>{
            if(this.props.disable)this.props.disable()
            this.props.eventPostAction(res.event)
            this.props.newEventMemberAction(res.ec)
            this.props.closeModal()
        })
    }

    render() { 
        console.log(this.props)
        return (
            <div>
                <div className="banner" style={this.bannerStyle()}>
                    <h1>{this.props.event.name}</h1>
                </div>
                {this.renderSubBanner()}
                <PreferredJobScene preferredJobs={this.state.preferredJobs} setJobs={this.setJobs}/>
                <div className="buttons-container">
                    <button onClick={this.joinEvent}>Join</button>
                </div>
            </div>
        );
    }
}

const msp = (state) =>({
    activeCharacter: state.characters.accountPrimary,
    event: state.modal.ecEvent, 
    content_image: state.modal.ecContentImage,
    disable: state.modal.ecButtonDisabler
})
 
export default connect(msp, { closeModal, eventPostAction, newEventMemberAction })(JoinEventModal);