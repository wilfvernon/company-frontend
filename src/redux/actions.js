//characters
export const characterAction = (character) => {
    return {type: "CHARACTER", payload: character}
}

export function fetchCharacter(id){
    return (dispatch) => {
        dispatch({type: "FETCHING"})
         fetch("https://xivapi.com/character/" + id)
        .then(res=>res.json())
        .then((char)=>dispatch(characterAction(char)))
    }
}


//free companies
export const freeCompanyAction = (FC) => {
    return {type: "FREE_COMPANY_FROM_API", payload: FC}
}

export function fetchFC(id){
    return (dispatch) => {
        dispatch({type: "FETCHING"})
         fetch("https://xivapi.com/freecompany/" + id)
        .then(res=>res.json())
        .then((FC)=>dispatch(freeCompanyAction(FC)))
    }
}

//modals
export const closeModal = () => {
    return {type: "CLOSE_MODAL"}
}

export const newEventModal = () => {
    return {type:"NEW_EVENT_MODAL"}
}