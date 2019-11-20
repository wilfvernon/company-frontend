const defaultState={
  userCharacter: null
}

const characterReducer = (prevState=defaultState, action) => {
    switch (action.type) {
        case "CHARACTER":
            return {...prevState, userCharacter: action.payload}
        default:
            return prevState
    }
}

export default characterReducer