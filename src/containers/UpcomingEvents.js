import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './css/cardList.css';
import UpcomingEventCard from '../components/UpcomingEventCard'
import { fetchUpcomingEvents } from '../redux/actions'
 
class UpcomingEvents extends Component {

    componentDidMount(){
        const { fetchUpcomingEvents, currentUser } = this.props
        fetchUpcomingEvents(currentUser.id)
        this.interval = setInterval(()=>fetchUpcomingEvents(currentUser.id), 20000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    filterEventsByDate = (date) => {
        return this.props.events.filter(event=>event.time.dateString===date)
    }

    dateArray = () => {
        const arr = this.props.events.map(event=>{
            return event.time.dateString
        })
        return Array.from(new Set(arr))
    }

    mapEventsToDate = () => {
        return this.dateArray().map(date=>{
            return (
                {
                date: date,
                events: this.filterEventsByDate(date)
            })
        })
    }

    renderEventCards = (events) => {
        return events.map(event=>{
            return(
                <UpcomingEventCard key={event.id} event={event}/>
            )
        })
    }

    renderEvents = () => {
        return this.mapEventsToDate().map(obj=>{
            return(
                <Fragment key={obj.date}>
                    <h3>{obj.date}</h3>
                    {this.renderEventCards(obj.events)}
                </Fragment>
            )
        })
    }

    render() { 
        return (
            <div className="card-container">
                <h2>Upcoming Events</h2>
                <hr/>
                <div className="card-list">
                    {this.props.events?this.renderEvents():"Loading"}
                </div>
            </div>
        );
    }
}

const msp = (state) => ({
    currentUser: state.account.activeUser,
    events: state.events.upcoming
})
 
export default connect(msp, { fetchUpcomingEvents })(UpcomingEvents);