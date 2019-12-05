const defaultState = {
    userEvents: [],
    pastEvents: [],
    upcomingEvents: [],
    lineupSlot: "none",
    newSlots: {}
};
const newSlotContent = (prevState, arr) =>{
    return arr.length === 1 ?
    {...prevState.newSlots, [arr[0].character.name]: arr[0]}
    :
    {...prevState.newSlots,  [arr[0].character.name]: arr[0], [arr[1].character.name]: arr[1]}
}
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
        case "LINEUP_SLOT":
            return {...prevState, lineupSlot: action.payload}
        case "CLEAR_LINEUP_SLOT":
            return {...prevState, lineupSlot: "none"}
        case "NEW_SLOT_RENDER":
            return {...prevState, newSlots: newSlotContent(prevState, action.payload)}
        case "CLEAR_NEW_SLOT_RENDER":
            return {...prevState, newSlots: {}}
        default:
            return prevState
    }
}

export default eventReducer