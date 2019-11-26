import React from 'react'
import { connect } from 'react-redux'
import { newEventModal } from '../redux/actions'
import './css/menu.css'

const Menu = (props) => {
    return (
    <ul className="page-menu">
        <h1>Menu</h1>
        <h2>Events</h2>
        <h2 onClick={props.newEventModal}>Add an event</h2>
    </ul>
    )
}

export default connect(null, { newEventModal })(Menu)