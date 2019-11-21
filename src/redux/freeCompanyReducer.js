const defaultState={
    freeCompany: null,
  }
  
  const freeCompanyReducer = (prevState=defaultState, action) => {
      switch (action.type) {
          case "FREE_COMPANY_FROM_API":
              return {...prevState, freeCompany: action.payload}
          default:
              return prevState
      }
  }
  
  export default freeCompanyReducer