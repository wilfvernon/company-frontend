const defaultState={
    freeCompany: null,
  }
  
  const freeCompanyReducer = (prevState=defaultState, action) => {
      switch (action.type) {
          case "FREE_COMPANY":
              return {...prevState, freeCompany: action.payload}
          default:
              return prevState
      }
  }
  
  export default freeCompanyReducer