import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import './css/newPostModal.css'
import ReactQuill from 'react-quill'
import { closeModal } from '../redux/actions'
import { RAILS_BASE_URL } from '../index'

class NewPostModal extends Component {

    state={
        title: "",
        text: ""
    }

    bannerStyle=()=>({
        backgroundImage: "url(http://novacrystallis.com/wp-content/uploads/2019/09/ishgard.png)",
        backgroundPosition: "0 -9vh"
    })


    quillStyle=()=>({
        height: "34vh",
        width: "56vw",
        padding: "2%"
    })

    handleTitleChange=(e)=>{
        this.setState({
            title: e.target.value
        })
    }

    handleTextChange=(value)=>{
        this.setState({
            text: value
        })
    }

    getController=()=>{
        switch (this.props.target) {
            case "event":
                return "event_threads"
            case "community":
                return "community_threads"
            case "eventPost":
                return "event_posts"  
            case "communityPost" :
                return "community_posts"     
            default:
                break;
        }
    }

    fetchBody=()=>{
        if(this.props.target === "event" || this.props.target === "community"){
            return{
                text: this.state.text,
                title: this.state.title,
                target_id: this.props.targetId,
                character_id: this.props.activeCharacter.id
            }
        }else if(this.props.target === "eventPost" || this.props.target === "communityPost"){
            return{
                text: this.state.text,
                target_id: this.props.targetId,
                character_id: this.props.activeCharacter.id
            }
        }
    }

    handleClick=()=>{
        fetch(RAILS_BASE_URL + this.getController(), {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(this.fetchBody())
        })
        this.props.closeModal()
    }

    render() { 
        return (
            <div>
                <div className="banner" style={this.bannerStyle()}>
                    <h1>New Post</h1>
                </div>
                    {this.props.target === "event" || this.props.target ==="community"?
                    <input 
                        name="title" 
                        value={this.state.title} 
                        id="post-title" 
                        placeholder="Post Title"
                        onChange={this.handleTitleChange}
                    />
                    :null}
                    <ReactQuill
                        onChange={this.handleTextChange}
                        value={this.state.text}
                        style={this.quillStyle()}
                    />
                    <button onClick={this.handleClick} id="post-thread-button">Post</button>
            </div>
        );
    }
}
 
const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary,
    targetId: state.modal.threadTargetId,
    target: state.modal.threadTarget
})

export default connect(msp, { closeModal })(NewPostModal);