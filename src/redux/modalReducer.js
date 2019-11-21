const defaultState={
    modal: false,
    modalType: ""
}

const modalReducer= (prevState=defaultState, action) => {
    switch (action.type) {
        case "NEW_EVENT_MODAL":
            return {...prevState, modalType: "EventNew", modal:true}
        case "CLOSE_MODAL":
            return {...prevState, modalType: "", modal:false}
        default:
            return prevState
    }
}

export default modalReducer

