import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from './UserEventList'

class Calendar extends Component {

    componentDidMount(){

    }

    render(){
        const { activeUser } = this.props
        return (
            <div>
                <h1>This is the calendar page for {activeUser.username}</h1>
                <EventList />
            </div>
        )
    }
}

const msp = (state) => ({
    activeUser: state.account.activeUser
})

export default connect(msp)(Calendar)