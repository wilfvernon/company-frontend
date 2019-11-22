const defaultState={
    activeUser: null,
    authenticated: null
  }

const accountReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "ACTIVE_ACCOUNT":
            return {...prevState, activeUser: action.payload, authenticated: true}
        case "AUTH_FAILED":
            return {...prevState, authenticated: false}
        default:
            return prevState
    }
}

export default accountReducer