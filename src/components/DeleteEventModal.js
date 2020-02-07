import React, {Component} from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'
import './css/deleteEventModal.css'
import { RAILS_BASE_URL } from '../index'
import { Link } from 'react-router-dom'

class DeleteEventModal extends Component {

    state={
        deleteStatus: "not attempted"
    }

    fetchObj = ({method: "DELETE", headers: {"Content-Type": "application/json", "Accept": "application/json"}})

    deleteEvent=()=>{
        fetch(RAILS_BASE_URL + "events/" + this.props.event.id, this.fetchObj)
        .then(res=>res.json())
        .then(res=>this.setState({deleteStatus: res.value}))
        .catch(console.log)
    }

    render(){
        switch (this.state.deleteStatus) {
            case "success":
                return (
                    <div className="delete-event-modal-container">
                        <div className="success-banner">
                            <p>Event Deleted!</p>
                        </div>
                        <div id="event-delete-confirmed">
                            <Link to="/calendar">
                                <button onClick={this.props.closeModal}>Close</button>
                            </Link>
                        </div>
                    </div>
                )
            case "failure":
                return (
                    <div className="delete-event-modal-container">
                        <div className="failure-banner">
                            <p>Something went wrong... Please close and try again.</p>
                        </div>
                        <div id="event-delete-confirmed">
                            <Link to="/calendar">
                                <button onClick={this.props.closeModal}>Close</button>
                            </Link>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="delete-event-modal-container">
                        <div className="sub-banner">
                            <p>Do you really want to delete this event?</p>
                        </div>
                        <div className="buttons-container">
                            <button onClick={this.deleteEvent}>Yes</button>
                            <button onClick={this.props.closeModal}>No</button>
                        </div>
                    </div>
                )
        }
        
    }
}

const msp = (state) => ({
    event: state.modal.ecEvent
})

export default connect(msp, {closeModal})(DeleteEventModal);