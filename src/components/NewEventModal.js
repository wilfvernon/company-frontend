import React from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'

const NewEventModal = (props) => {
    return <h1 onClick={props.closeModal}>New Event Modal</h1>
}

export default connect(null, { closeModal })(NewEventModal)