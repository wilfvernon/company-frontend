import React from 'react'
import { connect } from 'react-redux'
import { newEventModal } from '../redux/actions'
import './css/menu.css'

const Menu = (props) => {
    return (
    <div className="page-menu">
        <h1>This is the Menu</h1>
        <h2 onClick={props.newEventModal}>Add an event</h2>
    </div>
    )
}

export default connect(null, { newEventModal })(Menu)