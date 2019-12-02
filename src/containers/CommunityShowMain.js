import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CalendarEvent from '../components/CalendarEvent'
import moment from 'moment'
import './css/communityShowMain.css'

const localizer = momentLocalizer(moment)
const components = {
    event: CalendarEvent
}
 
class CommunityShowMain extends Component {

    compileEventList=()=>{
        return this.props.events.map(event=>({
            id: event.id,
            title: event.name,
            start: new Date(event.time.start),
            end: new Date(event.time.end),
            allDay: false,
            fullEvent: event
        }))
    }

    getView=()=>{
        switch (this.props.view) {
            case "calendar":
                return(
                <Calendar
                    components={components}
                    localizer={localizer}
                    events={this.compileEventList()}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: "66vh", width:"57vw"}}
                    onSelectEvent={e=>this.props.history.push("/events/" + e.id)}
                    popup={true}
                />
                )
            case "posts":
                return<h1>Posts</h1>
            default:
                break;
        }
    }

    render() { 
        const { community, view, changeView } = this.props
        return (
            <div className="community-show-main">
                <div id="community-show-desc-buttons">
                    <h3 id="community-show-description">{community.description}</h3>
                    <div id="community-show-view-buttons">
                        <button 
                            id="post-button" 
                            className={view==="posts"?"active-community-view-button":"inactive-community-view-button"}
                            onClick={view==="posts"?null:()=>changeView("posts")}>
                            <i className="material-icons">forum</i>
                        </button>   
                        <button 
                            id="calendar-button" 
                            className={view==="calendar"?"active-community-view-button":"inactive-community-view-button"}
                            onClick={view==="calendar"?null:()=>changeView("calendar")}>
                            <i className="material-icons">event</i>
                        </button>                                            
                    </div>
                </div>
                <div id="community-show-main-view">
                    {this.getView()}
                </div>
            </div>
        );
    }
}
 
export default connect()(CommunityShowMain);