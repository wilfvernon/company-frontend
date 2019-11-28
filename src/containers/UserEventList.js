import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountEvents } from '../redux/actions'
import { Link } from 'react-router-dom'
 
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
            const { name, category, location, time, community } = e
            return(
                <Link to={"/events/" + e.id} key={e.id}>
                    <li >
                        <h5>{ name }</h5>
                        <p>{time.dateString}, {time.start}-{time.end}</p>
                        <p>{community}</p>
                        <p>{category}</p>
                        {location?<p>{location}</p>:null}
                    </li>
                </Link>
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