const defaultState={
  userPrimaryCharacter: null
}

const characterReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "CHARACTER":
            return {...prevState, userPrimaryCharacter: action.payload}
        default:
            return prevState
    }
}

export default characterReducer