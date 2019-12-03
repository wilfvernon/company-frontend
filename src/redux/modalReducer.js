const defaultState={
    modal: false,
    modalType: "",
    menu: false,
    threadTargetId: null,
    threadTarget: "w"
}

const modalReducer= (prevState=defaultState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {defaultState}
        case "TOGGLE_MENU":
            return {...prevState, menu: !prevState.menu }
        case "NEW_EVENT_MODAL":
            return {...prevState, modalType: "EventNew", modal:true}
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

