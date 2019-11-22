import { FFXIV_API_BASE_URL, RAILS_BASE_URL } from '../index'

//characters
export const characterAction = (character) => {
    return {type: "CHARACTER", payload: character}
}

export function fetchCharacter(id){
    return (dispatch) => {
        dispatch({type: "FETCHING"})
         fetch(FFXIV_API_BASE_URL + "character/" + id)
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
         fetch(FFXIV_API_BASE_URL + "freecompany/" + id)
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

//accounts

export const activeAccountAction = (account) => {
    return {type:"ACTIVE_ACCOUNT", payload: account}
}

export const usernameAuthFailed = () => {
    return ({type: "AUTH_FAILED"})
}

export function validateUsername(username){
    console.log(RAILS_BASE_URL + "accounts/validate/" + username)
    return (dispatch) => {
        // dispatch({type: "FETCHING"})
         fetch(RAILS_BASE_URL + "accounts/validate/" + username)
        .then(res=>res.json())
        .then(res=>{
            if(res.valid){
                dispatch(activeAccountAction(res.account))
            } else {
                dispatch(usernameAuthFailed())
            }
        })
    }
}