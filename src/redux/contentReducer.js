const defaultState = {
    all: [],
    raids: [],
    savageRaids: [],
    trials: []
};
 
const contentFilter = (array, category) => {
    return array.filter(content => content.category === category)
}

const contentReducer = (prevState = defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "ALL_CONTENT":
            return {
                ...prevState, 
                all: action.payload, 
                raids: contentFilter(action.payload, "Raid"), 
                savageRaids: contentFilter(action.payload, "Savage Raid"),
                trials: contentFilter(action.payload, "Trial")   
            }
        default:
            return prevState
    }
}

export default contentReducer