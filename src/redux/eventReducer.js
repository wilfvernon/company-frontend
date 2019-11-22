const defaultState = {
    userEvents: []
};
 
const eventReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case "GET_USER_EVENTS":
            return {...prevState, userEvents: action.payload}
        default:
            return prevState
    }
}

export default eventReducer