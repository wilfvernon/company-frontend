import React from 'react'
import { connect } from 'react-redux'
import { fetchCharacter, fetchFC } from '../redux/actions.js.js'

const Test = () => {

    fetches = () => {
        const { fetchCharacter, fetchFC } = this.props
        fetchCharacter("18875885")
        fetchFC("9229283011365769087")
      }
      
    const { character, thunking, fc } = this.props
    return(
        <div className="App">
          <h1 onClick={this.fetches}>{thunking?"thunking":character?character["Character"]["Name"]:"MVP"}</h1>
          {fc?<h2>{fc["FreeCompany"]["Name"]}</h2>:null}
          {character?<img src={character["Character"]["Portrait"]} alt="Goose" />:null}
        </div>
    )
}

const msp = (state) => {
    return {
      character: state.character.userCharacter,
      thunking: state.thunk.thunking,
      fc: state.freeCompany.freeCompany
    }
  }
  
  export default connect(msp, { fetchCharacter, fetchFC })(Test);