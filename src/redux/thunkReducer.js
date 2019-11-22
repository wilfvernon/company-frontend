const defaultState={
    thunking: false,
    loadingUserEvents: false
  }
  
  const thunkReducer = (prevState=defaultState, action) => {
      switch (action.type) {
            case "FETCHING_USER_EVENTS":
                return {...prevState, loadingUserEvents: true}
            case "GET_USER_EVENTS":
                return {...prevState, loadingUserEvents: false}
            case "FETCHING":
                return {...prevState, thunking: true}
            case "CHARACTER":
                return {...prevState, thunking: false}
            case "FREE_COMPANY_FROM_API":
                return {...prevState, thunking: false}
          default:
              return prevState
      }
  }
  
  export default thunkReducer