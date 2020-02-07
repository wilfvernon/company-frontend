import React from 'react'
import NewEventModal from './NewEventModal'
import NewAccountModal from './NewAccountModal'
import NewPostModal from './NewPostModal'
import './css/modal.css'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'
import JoinEventModal from './JoinEventModal';
import DeleteEventModal from '../components/DeleteEventModal'

const Modal = (props) => {
    
    const renderModalContent = () => {
        switch (props.type) {
            case "EventNew":
                return <NewEventModal/>
            case "EventJoin":
                return <JoinEventModal/>
            case "EventDelete":
                return <DeleteEventModal/>
            case "AccountNew":
                return <NewAccountModal/>
            case "PostNew":
                return <NewPostModal/>
            default:
                break;
        }
    }

    const getDimensions = () =>{
        switch (props.type) {
            case "PostNew":
                return {width: "60vw", height: "80vh"} 
            case "AccountNew":
                return {width: "43vw", minHeight: "50vh"}
            case "EventDelete":
                return {width: "30vw", height: "20vh", marginTop: "25vh"}
            default:
                return {width: "43vw", height: "80vh"}
        }
    }

    const getPosition = () =>{
        switch (props.type) {
            case "PostNew":
                return {marginLeft: "81vw"} 
            case "EventDelete":
                return {marginLeft: "65vw", marginTop: "20vh"}
            default:
                return {marginLeft: "72vw"}
        }
    }
    
    return(
        <div className="modal-container">
            <h1 style={getPosition()} onClick={props.closeModal} className="modal-close">x</h1>
            <div style={getDimensions()}className="modal-div">
            {renderModalContent()}
            </div>
        </div>
    )
}


const msp = (state) => ({
    type: state.modal.modalType
})

export default connect(msp, { closeModal })(Modal)