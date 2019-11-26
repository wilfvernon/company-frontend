const defaultState={
    account: [],
    accountPrimary: null
}

const characterReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "ACTIVE_ACCOUNT":
            return {...prevState, account: action.payload.characters, accountPrimary: action.payload.characters.find(character=>character.primary)}
        // case "CHARACTER":
        //     return {...prevState, accountPrimary: action.payload}
        default:
            return prevState
    }
}

export default characterReducer