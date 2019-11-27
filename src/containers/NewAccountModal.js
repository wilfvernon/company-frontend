import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NewAccountUsernameScene from '../components/NewAccountUsernameScene'
import NewAccountCharacterScene from '../components/NewAccountCharacterScene'
import ModalSubBanner from '../components/ModalSubBanner';
import './css/newAccountModal.css'
import { RAILS_BASE_URL } from '../index'
 
class NewAccountModal extends Component {
    
    state={
        scene: 1,
        valid: null,
        username: "",
        character: null,
        postValid: null
    }

    renderSubBanner=()=>{
        switch (this.state.scene) {
            case 1:
                if(this.state.valid === null) return <ModalSubBanner class="sub-banner" text={()=><p>Enter a username:</p>}/>
                else if(this.state.valid) return <ModalSubBanner class="success-banner" text={()=><p>That username is available</p>}/>
                else return <ModalSubBanner class="failure-banner" text={()=><p><span>Sorry, that username is taken</span></p>}/> 
            case 2:
                if(this.state.postValid === null) return  <ModalSubBanner class="sub-banner" text={()=><p>Connect a character:</p>}/>
                else if(this.state.postValid) return <ModalSubBanner class="success-banner" text={()=><p>Account successfully created!</p>}/>
                else return <ModalSubBanner class="failure-banner" text={()=><p>Something went wrong... Please check your entries and try again</p>}/>
            default:
                break;
        }
    }

    getScene=()=>{
        switch (this.state.scene) {
            case 1:
                return (
                <Fragment>
                    <NewAccountUsernameScene 
                        setParentState={this.setParentState}
                        username={this.state.username}
                    />
                    <div className="buttons-container">
                        <button onClick={this.incrementScene}>Next</button>
                    </div>  
                </Fragment>
                )
            case 2:
                return (
                <Fragment>
                    <NewAccountCharacterScene 
                        setParentState={this.setParentState}
                        character={this.state.character}
                    />
                    <div className="buttons-container">
                        <button onClick={this.postAccount}>{this.state.character?"Create Account":"Skip and Create Account"}</button>
                        <button onClick={this.decrementScene}>Back</button>
                    </div>  
                </Fragment>
                )    
            default:
                break;
        }
    }

    setParentState = (obj) => {
        this.setState(obj)
        if(obj.username){
           fetch(RAILS_BASE_URL + "accounts/validate_new/" + obj.username)
           .then(res=>res.json())
           .then(res=>{
               this.setState({valid: res.valid})
           })
        }
    }

    incrementScene = () => {
        this.setState(prevProps=>({
            scene: prevProps.scene + 1
        }))
    }

    decrementScene = () => {
        this.setState(prevProps=>({
            scene: prevProps.scene - 1
        }));
    }

    accountBody=()=>{
        const { username, character } = this.state
        return {
            account: { username },
            character: character?{
                name: character["Name"],
                profile_image: character["Avatar"],
                server: character["Server"],
                api_id: character["ID"]
            }:null
        }
    }

    postAccount=()=>{
        fetch(RAILS_BASE_URL + "accounts", {
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(this.accountBody())
        }).then(res=>res.json())
        .then(res=>{
            this.setState({ postValid: !!res.valid})
        })
    }
    
    render() { 

        return (
            <div className="new-account-modal">
                <div className="banner">
                    <h1>Sign Up</h1>
                </div>
                {this.renderSubBanner()}
                {this.getScene()}
            </div>
        );
    }
}
 
export default connect()(NewAccountModal);