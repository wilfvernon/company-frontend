import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountEvents } from '../redux/actions'
 
class UserEventList extends Component {

    componentDidMount(){
        const { fetchAccountEvents, currentUser } = this.props
        fetchAccountEvents(currentUser.id)
    }

    renderUserEvents = () => {
        const { loading, events } = this.props
        if(loading) return <h4>Loading</h4>

        else {
            return events.map(e=>{
            const { event, community, time} = e
            return(
                <li>
                    <h5>{event.name}</h5>
                    <p>{time}</p>
                    <p>{community}</p>
                </li>
                )
            })
        }
    }

    render() { 
        return (
            <div>
                <h2>EventList</h2>
                <ul>
                    {this.renderUserEvents()}
                </ul>
            </div>
        );
    }
}

const msp = (state) => ({
    currentUser: state.account.activeUser,
    events: state.events.userEvents,
    loading: state.thunk.loadingUserEvents
})
 
export default connect(msp, { fetchAccountEvents })(UserEventList);