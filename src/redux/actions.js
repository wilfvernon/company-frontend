import { FFXIV_API_BASE_URL, RAILS_BASE_URL } from '../index'

export const logoutAction = () => {
    return({type: "LOGOUT"})
}

//characters
export const characterAction = (character) => {
    return {type: "CHARACTER", payload: character}
}

export function fetchCharacter(id){
    return (dispatch) => {
        dispatch({type: "FETCHING"})
         fetch(FFXIV_API_BASE_URL + "character/" + id)
        .then(res=>res.json())
        .then((char)=>dispatch(characterAction(char)))
    }
}

export const newEventMemberAction = (ec) =>{
    return {type: "NEW_EVENT_MEMBER", payload: ec}
}

export const clearNewEventMember = () =>{
    return {type: "CLEAR_NEW_EVENT_MEMBER"}
}


//communities
export const addCommunity = (community) => {
    return {type: "ADD_COMMUNITY", payload: community}
}

export const freeCompanyAction = (FC) => {
    return {type: "FREE_COMPANY_FROM_API", payload: FC}
}

export function fetchFC(id){
    return (dispatch) => {
        dispatch({type: "FETCHING"})
         fetch(FFXIV_API_BASE_URL + "freecompany/" + id)
        .then(res=>res.json())
        .then((FC)=>dispatch(freeCompanyAction(FC)))
    }
}

//events
export const accountEventsAction = (events) => {
    return {type:"GET_USER_EVENTS", payload: events}
}

export const fetchAccountEvents = (id) => {
    return dispatch => {
        dispatch({type: "FETCHING_USER_EVENTS"})
        fetch(RAILS_BASE_URL + "/accounts/" + id + "/events")
        .then(res=>res.json())
        .then(res=>dispatch(accountEventsAction(res)))
    }
}

export const upcomingEventsAction = (events) => {
    return {type: "UPCOMING_EVENTS", payload: events}
}

export const fetchUpcomingEvents = (id) => {
    return dispatch => {
        dispatch({type: "FETCHING_UPCOMING_EVENTS"})
        fetch(RAILS_BASE_URL + "/accounts/" + id + "/upcoming_events")
        .then(res=>res.json())
        .then(res=>dispatch(upcomingEventsAction(res)))
    }
}

export const eventPostAction = (e, type) => {
    return {type:"EVENT_" + type, payload: e}
}

export const lineupSlotAction = (slot) => {
    return {type: "LINEUP_SLOT", payload: slot}
}

export const clearLineupSlotAction = () => {
    return {type: "CLEAR_LINEUP_SLOT"}
}

export const newSlotRender = (arr) => {
    return {type: "NEW_SLOT_RENDER", payload: arr}
}

export const clearNewSlotRender = () => {
    return {type: "CLEAR_NEW_SLOT_RENDER"}
}
//content
export const contentAction = (content) => {
    return ({type: "ALL_CONTENT", payload: content})
}

export const fetchContent = () => {
    return(dispatch) => {
        fetch(RAILS_BASE_URL + "contents")
        .then(res=>res.json())
        .then(content=>dispatch(contentAction(content)))
    }
}

export const setEventFetch = (fetch) => {
    return ({type: "SET_EVENT_FETCH", payload: fetch})
}

//accounts

export const activeAccountAction = (account) => {
    return {type:"ACTIVE_ACCOUNT", payload: account}
}

export const usernameAuthFailed = () => {
    return ({type: "AUTH_FAILED"})
}

export function validateUsername(username){
    return (dispatch) => {
        // dispatch({type: "FETCHING"})
         fetch(RAILS_BASE_URL + "accounts/validate/" + username)
        .then(res=>res.json())
        .then(res=>{
            if(res.valid){
                const { account, characters, communities } = res
                dispatch(activeAccountAction({ account, characters, communities }))
            } else {
                dispatch(usernameAuthFailed())
            }
        })
    }
}

//modals
export const closeModal = () => {
    return {type: "CLOSE_MODAL"}
}

export const toggleMenuAction = () => {
    return {type: "TOGGLE_MENU"}
}

export const newEventModal = (event=null, eventType="POST") => {
    return {type:"NEW_EVENT_MODAL", payload: { event, eventType }}
}

export const joinEventModal = (event, image, buttonDisabler) => {
    return {type:"JOIN_EVENT_MODAL", payload: { event, image, buttonDisabler }}
}

export const deleteEventModal = (event) => {
    return {type:"DELETE_EVENT_MODAL", payload: { event }}
}

export const newAccountModal = () => {
    return {type:"NEW_ACCOUNT_MODAL"}
}

export const newPostModal = (id, target) => {
    return {type: "NEW_POST_MODAL", payload: {id, target}}
}

//jobs
export const jobAction = (jobs) => {
    return ({type: "JOB_ACTION", payload: jobs})
}

export const fetchJobs = () => {
    return(dispatch) => {
        fetch(RAILS_BASE_URL + "jobs")
        .then(res=>res.json())
        .then(jobs=>dispatch(jobAction(jobs)))
    }
}