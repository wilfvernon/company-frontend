const defaultState = {
    userEvents: [],
    pastEvents: []
};
 
const eventReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case "GET_USER_EVENTS":
            return {...prevState, userEvents: action.payload.filter(event=>!event.time.happened), pastEvents: action.payload.filter(event=>event.time.happened)}
        case "EVENT_POST":
            return {...prevState, userEvents: [...prevState.userEvents, action.payload]}
        default:
            return prevState
    }
}

export default eventReducer