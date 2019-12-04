const defaultState={
    account: [],
    accountPrimary: null,
    accountPrimaryApi: null,
    newEventMember: null
}

const characterReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "ACTIVE_ACCOUNT":
            return {...prevState, account: action.payload.characters, accountPrimary: action.payload.characters.find(character=>character.primary)}
        case "NEW_EVENT_MEMBER":
            return {...prevState, newEventMember: action.payload}
        case "CLEAR_NEW_EVENT_MEMBER":
            return {...prevState, newEventMember: null}
        case "CHARACTER":
            return {...prevState, accountPrimaryApi: action.payload}
        default:
            return prevState
    }
}

export default characterReducer