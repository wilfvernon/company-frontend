const defaultState = {
    userEvents: [],
    pastEvents: [],
    upcomingEvents: []
};
 
const eventReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "GET_USER_EVENTS":
            return {...prevState, userEvents: action.payload.filter(event=>!event.time.happened), pastEvents: action.payload.filter(event=>event.time.happened)}
        case "UPCOMING_EVENTS":
            return {...prevState, upcoming: action.payload}
        case "EVENT_POST":
            return {...prevState, userEvents: [...prevState.userEvents, action.payload]}
        default:
            return prevState
    }
}

export default eventReducer