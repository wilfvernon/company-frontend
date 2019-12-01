const defaultState={
    modal: false,
    modalType: "",
    menu: false
}

const modalReducer= (prevState=defaultState, action) => {
    switch (action.type) {
        case "TOGGLE_MENU":
            return {...prevState, menu: !prevState.menu }
        case "NEW_EVENT_MODAL":
            return {...prevState, modalType: "EventNew", modal:true}
        case "NEW_ACCOUNT_MODAL":
            return {...prevState, modalType: "AccountNew", modal:true}
        case "CLOSE_MODAL":
            return {...prevState, modalType: "", modal:false}
        default:
            return prevState
    }
}

export default modalReducer

