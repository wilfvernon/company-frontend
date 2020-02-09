const defaultState={
    modal: false,
    modalType: "",
    menu: false,
    threadTargetId: null,
    threadTarget: "",
    ecEvent: null,
    ecContentImage: "",
    ecButtonDisabler: null,
    eventType: null
}

const modalReducer= (prevState=defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "TOGGLE_MENU":
            return {...prevState, menu: !prevState.menu }
        case "NEW_EVENT_MODAL":
            return {...prevState, modalType: "EventNew", modal:true, ecEvent: action.payload.event, eventType: action.payload.eventType}
        case "JOIN_EVENT_MODAL":
            return {...prevState, modalType: "EventJoin", modal:true, ecEvent: action.payload.event, ecContentImage: action.payload.image, ecButtonDisabler: action.payload.buttonDisabler}
        case "DELETE_EVENT_MODAL":
            return {...prevState, modalType: "EventDelete", modal:true, ecEvent: action.payload.event}
        case "NEW_ACCOUNT_MODAL":
            return {...prevState, modalType: "AccountNew", modal:true}
        case "NEW_POST_MODAL":
            return {...prevState, modalType: "PostNew", modal:true, threadTargetId: action.payload.id, threadTarget: action.payload.target}
        case "CLOSE_MODAL":
            return {...prevState, modalType: "", modal:false, threadTargetId: null}
        default:
            return prevState
    }
}

export default modalReducer

