const defaultState={
    activeUser: null,
    authenticated: null
  }

const accountReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "ACTIVE_ACCOUNT":
            return {...prevState, activeUser: action.payload.account, authenticated: true}
        case "AUTH_FAILED":
            return {...prevState, authenticated: false}
        default:
            return prevState
    }
}

export default accountReducer