import React from 'react'
import NewEventModal from '../components/NewEventModal'
import './css/modal.css'
import { connect } from 'react-redux'

const Modal = (props) => {
    
    const renderModalContent = () => {
        switch (props.type) {
            case "EventNew":
                return <NewEventModal/>
            default:
                break;
        }
    }
    return(
        <div className="modal-container">
            <div className="modal-div">
            {renderModalContent()}
            </div>
        </div>
    )
}


const msp = (state) => ({
    type: state.modal.modalType
})

export default connect(msp)(Modal)