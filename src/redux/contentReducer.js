const defaultState = {
    all: []
};
 
const contentReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case "ALL_CONTENT":
            return {...prevState, all: action.payload}
        default:
            return prevState
    }
}

export default contentReducer