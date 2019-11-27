import React, { Component } from 'react';
import { FFXIV_API_BASE_URL } from '../index'
 
class NewAccountCharacterScene extends Component {

    state={
        lodestoneId: ""
    }

    lodestoneInstructions = () =>{
        return (<p>
            Go to the <a href="https://na.finalfantasyxiv.com/lodestone/" rel="noopener noreferrer"target="_blank">Final Fantasy XIV Lodestone</a> and navigate to your character's profile page.
            Copy the number at the end of the url and paste it here:<br/>(e.g. https://na.finalfantasyxiv.com/lodestone/character/*copy-this-number*/)
        </p>)
    }

    handleChange=(event)=>{
        this.setState({lodestoneId: event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        fetch(FFXIV_API_BASE_URL + "character/" + this.state.lodestoneId)
        .then(res=>res.json())
        .then(character=>{
            console.log(character)
            this.props.setParentState({ character: character["Character"] })
        })
    }

    render(){
        return (
            <div>
                {this.lodestoneInstructions()}
                <form onSubmit={this.handleSubmit}>
                    <input name="lodestoneId" type="text" value={this.state.lodestoneId} onChange={this.handleChange}/>
                    <input type="submit" value="Get Character"/>
                </form>
                {this.props.character?
                <div>
                    <img className="char-portrait" src={this.props.character["Avatar"]} alt="char-img"/>
                    <p>Is this you?</p>
                </div>
                :
                null}
            </div>
        );
    }
}
 
export default NewAccountCharacterScene;