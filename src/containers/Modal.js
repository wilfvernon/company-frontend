import React from 'react'
import NewEventModal from './NewEventModal'
import NewAccountModal from './NewAccountModal'
import NewPostModal from './NewPostModal'
import './css/modal.css'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'
import JoinEventModal from './JoinEventModal';

const Modal = (props) => {
    
    const renderModalContent = () => {
        switch (props.type) {
            case "EventNew":
                return <NewEventModal/>
            case "EventJoin":
                return <JoinEventModal/>
            case "AccountNew":
                return <NewAccountModal/>
            case "PostNew":
                return <NewPostModal/>
            default:
                break;
        }
    }

    const getWidth = () =>{
        switch (props.type) {
            case "PostNew":
                return {width: "60vw"} 
            default:
                return {width: "43vw"}
        }
    }

    const getPosition = () =>{
        switch (props.type) {
            case "PostNew":
                return {marginLeft: "81vw"} 
            default:
                return {marginLeft: "72vw"}
        }
    }
    
    return(
        <div className="modal-container">
            <h1 style={getPosition()} onClick={props.closeModal} className="modal-close">x</h1>
            <div style={getWidth()}className="modal-div">
            {renderModalContent()}
            </div>
        </div>
    )
}


const msp = (state) => ({
    type: state.modal.modalType
})

export default connect(msp, { closeModal })(Modal)