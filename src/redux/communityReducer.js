const defaultState={
    freeCompany: null,
    account: []
  }
  
  const freeCompanyReducer = (prevState=defaultState, action) => {
      switch (action.type) {
        case "ACTIVE_ACCOUNT":
                return {...prevState, account: action.payload.communities}
        //   case "FREE_COMPANY_FROM_API":
        //       return {...prevState, freeCompany: action.payload}
          default:
              return prevState
      }
  }
  
  export default freeCompanyReducer