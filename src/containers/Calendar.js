import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserEventList from './UserEventList'
import { fetchContent } from '../redux/actions'

class Calendar extends Component {

    componentDidMount(){
        this.props.fetchContent()
    }

    render(){
        const { activeUser } = this.props
        return (
            <div>
                <h1>This is the calendar page for {activeUser.username}</h1>
                <UserEventList />
            </div>
        )
    }
}

const msp = (state) => ({
    activeUser: state.account.activeUser
})

export default connect(msp, { fetchContent })(Calendar)