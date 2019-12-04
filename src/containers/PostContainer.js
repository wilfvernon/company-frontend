import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux' 
import { newPostModal } from '../redux/actions'
import 'react-quill/dist/quill.snow.css';
import './css/postContainer.css'
import { RAILS_BASE_URL } from '..';
import ReactQuill from 'react-quill'
 
class PostContainer extends Component {

    state={
        thread: null,

    }

    modules={
        toolbar: null
    }

    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval)
        }
    }

    fetchPost=(id)=>{
        fetch(RAILS_BASE_URL + this.props.target + "_threads/" + id)
        .then(res=>res.json())
        .then(thread=>{
            this.setState({thread})
        })
    }

    clickPost=(id)=>{
        this.fetchPost(id)
        this.interval = setInterval(()=>this.fetchPost(id), 3000)
    }

    threadView=()=>{
        this.setState({thread: null})
        clearInterval(this.interval)
    }

    renderThreads = () =>{
        return this.props.threads.map(thread=>{
            return(
                <div onClick={()=>this.clickPost(thread.thread.id)} key={thread.thread.id} id="thread-view" className="thread-box">
                    <div  className="thread-poster-box">
                        <img src={thread.poster.profile_image} alt="thread-poster"/>
                        <div className="thread-info">
                            <h4>{thread.thread.title}</h4>
                            <h5>{thread.poster.name}</h5>
                        </div>
                    </div>
                    {this.renderDate(thread.thread.created_at)}
                </div>
            )
        })
    }

    userStyle=()=>({
        outline: "none",
        textAlign: "end"
    })

    othersStyle=()=>({
        outline: "none"
    })

    renderDate = (date) =>{
        const d = new Date(date)
        return (
            <h6>{d.toLocaleTimeString()} | {d.toLocaleDateString()}</h6>
        )
    }

    renderPosts = () => {
        const {thread} = this.state
        return (
        <Fragment>
            <div className="thread-box" id="thread-view">
                <div className="thread-poster-box" id="thread-view">
                    <img src={thread.poster.profile_image} alt="thread-poster"/>
                    <div className="thread-info">
                        <h4>{thread.thread.title}</h4>
                        <h5>{thread.poster.name}</h5>
                    </div>
                </div>
                <div className="thread-extra-box">
                    {this.renderDate(thread.thread.created_at)}
                    <button onClick={this.newPostModal}>Comment</button>
                </div>
            </div>
            <div id={this.props.target + "-thread-posts"}>
            {thread.posts?
            thread.posts.map(post=>{
                return (
                    <div key={post.post.id} className={post.poster.id===this.props.activeCharacter.id?"individual-post-box-user":"individual-post-box"}>
                        <div className="post-poster-info">
                            <img className="post-profile-image" src={post.poster.profile_image} alt="profile"/>
                            <div className="post-poster-extra">
                                {this.renderDate(post.post.created_at)}
                                <p>{post.poster.name}</p>
                            </div>
                        </div>

                        <ReactQuill 
                            style={post.poster.id===this.props.activeCharacter.id?this.userStyle():this.othersStyle()}
                            modules={this.modules} 
                            key={post.post.id} 
                            value={post.post.text} 
                            readOnly={true}
                        />
                    </div>
                )
            })
            :
            <h1>No posts!</h1>
        }
        </div>
        </Fragment>
        )
    }

    renderContent = () => {
        return !this.state.thread?this.renderThreads():this.renderPosts()
    }

    newThreadModal = () => {
        this.props.newPostModal(this.props.targetId, this.props.target)
    }

    newPostModal = () => {
        this.props.newPostModal(this.state.thread.thread.id, (this.props.target + "Post"))
    }

    render() { 
        return (
            <div id={this.props.target + "-post-box"}>
                <div id={this.props.target + "-post-header"}>                   
                        <h2>Discussion</h2>
                    <div id={this.props.target + "-post-header-div"}>
                        <i onClick={this.newThreadModal} className="material-icons">post_add</i>
                        {this.state.thread?<i onClick={this.threadView} className="material-icons">arrow_back</i>:null}
                    </div>
                </div>
                <ul id={this.props.target + "-thread-box"} style={this.state.thread?{overflow: "hidden"}:{overflow:"scroll"}}>
                    {this.props.threads.length?
                    this.renderContent()
                    :<div className="thread-box">
                        <h1>No Threads!</h1>
                    </div>
                    }
                </ul>
            </div>
        );
    }
}

const msp = (state) =>({
    activeCharacter: state.characters.accountPrimary
})
 
export default connect(msp, { newPostModal })(PostContainer);