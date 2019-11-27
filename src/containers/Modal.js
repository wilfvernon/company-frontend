import React from 'react'
import NewEventModal from './NewEventModal'
import NewAccountModal from './NewAccountModal'
import './css/modal.css'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'

const Modal = (props) => {
    
    const renderModalContent = () => {
        switch (props.type) {
            case "EventNew":
                return <NewEventModal/>
            case "AccountNew":
                return <NewAccountModal/>
            default:
                break;
        }
    }
    return(
        <div className="modal-container">
            <h1 onClick={props.closeModal} className="modal-close">x</h1>
            <div className="modal-div">
            {renderModalContent()}
            </div>
        </div>
    )
}


const msp = (state) => ({
    type: state.modal.modalType
})

export default connect(msp, { closeModal })(Modal)