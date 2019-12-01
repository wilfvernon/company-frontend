import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarEvent from '../components/CalendarEvent'
import { fetchContent, fetchAccountEvents } from '../redux/actions'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './css/rbc.css'

const localizer = momentLocalizer(moment)
const components = {
    event: CalendarEvent
}

class UserCalendar extends Component {

    componentDidMount(){
        const { fetchAccountEvents, fetchContent, activeUser } = this.props
        fetchContent()
        fetchAccountEvents(activeUser.id)
    }

    compileEventList = () => {
        return this.props.events.map(event=>({
            id: event.id,
            title: event.name,
            start: new Date(event.time.start),
            end: new Date(event.time.end),
            allDay: false
        }))
    }

    render(){
        const { activeUser, events } = this.props
        return (
            events?
            <div>
                <h1>This is the calendar page for {activeUser.username}</h1>
                <Calendar
                    components={components}
                    localizer={localizer}
                    events={this.compileEventList()}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 600, width:900}}
                    onSelectEvent={e=>this.props.history.push("/events/" + e.id)}
                    popup={true}
                />
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

export default connect(msp, { fetchContent, fetchAccountEvents })(UserCalendar)