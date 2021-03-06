import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewAccountUsernameScene from '../components/NewAccountUsernameScene'
import NewAccountCharacterScene from '../components/NewAccountCharacterScene'
import ModalSubBanner from '../components/ModalSubBanner';
import './css/newAccountModal.css'
import { RAILS_BASE_URL } from '../index'
import { closeModal } from '../redux/actions'
class NewAccountModal extends Component {
    
    state={
        scene: 1,
        valid: null,
        username: "",
        character: null,
        postValid: null,
        usernameInput: ""
    }

    renderSubBanner=()=>{
        switch (this.state.scene) {
            case 1:
                if(this.state.valid === null) return <ModalSubBanner class="sub-banner" text={()=><p>Enter a username (if testing the website, please login as 'goose'):</p>}/>
                else if(this.state.valid) return <ModalSubBanner class="success-banner" text={()=><p>That username is available</p>}/>
                else return <ModalSubBanner class="failure-banner" text={()=><p><span>Sorry, that username is unavailable</span></p>}/> 
            case 2:
                if(this.state.postValid === null) return  <ModalSubBanner class="sub-banner" text={()=><p>Connect a character:</p>}/>
                else if(this.state.postValid) return <ModalSubBanner class="success-banner" text={()=><p>Account successfully created!</p>}/>
                else return <ModalSubBanner class="failure-banner" text={()=><p>Something went wrong... Please check your entries and try again</p>}/>
            default:
                break;
        }
    }

    getButtonClass = () => {
        return this.state.valid ? "modal-div-button-next" : "modal-div-button-next-invalid"

    }

    getScene=()=>{
        switch (this.state.scene) {
            case 1:
                return (
                <div id="username-scene">
                    <NewAccountUsernameScene 
                        setParentState={this.setParentState}
                        username={this.state.username}
                        usernameInput={this.state.usernameInput}
                    />
                    <button className={this.getButtonClass()} onClick={this.incrementScene}>Next</button>                     
                </div>
                )
            case 2:
                return (
                <div id="character-scene">
                    <NewAccountCharacterScene 
                        setParentState={this.setParentState}
                        character={this.state.character}
                    />
                    <div className="buttons-container">
                        <button onClick={this.state.postValid === true ? this.props.closeModal : this.postAccount}>{!this.state.postValid === true ?"Create Account":"Close"}</button>
                        <button disabled={!!this.state.postValid} onClick={this.decrementScene}>Back</button>
                    </div>  
                </div>
                )    
            default:
                break;
        }
    }

    setParentState = (obj) => {
        this.setState(obj)
    }

    fetchObj = (name) => ({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ name })
    })
    
    fetchAccount = (name) => fetch(RAILS_BASE_URL + "accounts/validate_new/", this.fetchObj(name))


    incrementScene = () => {
        if(this.state.valid === true){   
        this.fetchAccount(this.state.usernameInput)
        .then(res=>res.json())
        .then(res=>{
            if(res.valid){
                this.setState(prevProps=>({
                        scene: prevProps.scene + 1
                }))
            }
        })
    }}

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
                api_id: character["ID"],
                avatar: character["Portrait"]
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
 
export default connect(null, {closeModal})(NewAccountModal);