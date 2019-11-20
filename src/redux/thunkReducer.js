const defaultState={
    thunking: false
  }
  
  const thunkReducer = (prevState=defaultState, action) => {
      switch (action.type) {
            case "FETCHING":
                return {...prevState, thunking: true}
            case "CHARACTER":
                 return {...prevState, thunking: false}
            case "FREE_COMPANY":
                return {...prevState, thunking: false}
          default:
              return prevState
      }
  }
  
  export default thunkReducer