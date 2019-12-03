import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarEvent from '../components/CalendarEvent'
import UpcomingEvents from './UpcomingEvents'
import { fetchContent, fetchAccountEvents, fetchJobs } from '../redux/actions'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './css/rbc.css'
import './css/userCalendar.css'

const localizer = momentLocalizer(moment)
const components = {
    event: CalendarEvent
}

class UserCalendar extends Component {

    componentDidMount(){
        const { fetchAccountEvents, fetchContent, fetchJobs, activeUser } = this.props
        fetchJobs()
        fetchContent()
        fetchAccountEvents(activeUser.id)
    }

    compileEventList = () => {
        return this.props.events.map(event=>({
            id: event.id,
            title: event.name,
            start: new Date(event.time.start),
            end: new Date(event.time.end),
            allDay: false,
            fullEvent: event
        }))
    }

    render(){
        const { activeUser, events } = this.props
        return (
            events?
            <div className="calendar-page">
                <div className="calendar-box">
                    <h1>{activeUser.username}'s Calendar</h1>
                    <Calendar
                        components={components}
                        localizer={localizer}
                        events={this.compileEventList()}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: "76vh", width:"62vw"}}
                        onSelectEvent={e=>this.props.history.push("/events/" + e.id)}
                        popup={true}
                    />
                </div>
                <UpcomingEvents />
            </div>
            :
            <div>
                Loading
            </div>
            
        )
    }
}

const msp = (state) => ({
    activeUser: state.account.activeUser,
    events: state.events.userEvents
})

export default connect(msp, { fetchContent, fetchAccountEvents, fetchJobs })(UserCalendar)