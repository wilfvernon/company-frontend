import React from 'react'
import { connect } from 'react-redux'

const DeleteEventModal = (props) => {

}

const msp = (state) => ({
    event: state.events.ecEvent
})

export default connect(msp)(DeleteEventModal);