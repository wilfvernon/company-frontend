import React, { Component } from 'react'
import { RAILS_BASE_URL, FFXIV_API_BASE_URL } from '../index'
import { connect } from 'react-redux'
import CommunityShowHeader from '../components/CommunityShowHeader'
import CommunityShowMain from './CommunityShowMain'
import MemberList from './MemberList'
// import UpcomingEvents from './UpcomingEvents'
import './css/communityShow.css'

class CommunityShow extends Component {

    state={
        community: null,
        api_community: null,
        members: null,
        isMember: false,
        view: "posts",
        events: [],
        threads: [],
        disabled: false
    }

    disable=()=>{
        this.setState({disabled: true})
    }

    componentDidMount(){
        fetch(RAILS_BASE_URL + "communities/" + this.props.id)
        .then(res=>res.json())
        .then((fc)=>{
            this.setState({
            community: fc.community,
            members: fc.members,
            admins: fc.admins,
            isMember: fc.members.concat(fc.admins).map(member=>member.id).includes(this.props.activeCharacter.id)?true:false,
            events: fc.events,
            threads: fc.threads
        })
        if(this.state.community.category === "FC"){
            fetch(FFXIV_API_BASE_URL + "freecompany/" + this.state.community.api_id)
            .then(res=>res.json())
            .then((fc)=>this.setState({api_community: fc["FreeCompany"]}))
        }else this.setState({api_community: this.dummyApiCommunity()})
        }   
        )
        this.interval = setInterval(this.fetchThreads, 500)
    }

    fetchThreads = () =>{
        if(this.state.community){
        fetch(RAILS_BASE_URL + "communities/" + this.props.id + "/threads")
        .then(res=>res.json())
        .then(threads=>this.setState({threads}))
        }
    }

    componentWillUnmount=()=>{
        clearInterval(this.interval)
    }

    dummyApiCommunity=()=>{
        return {}
    }

    joinCommunity=()=>{
        fetch(RAILS_BASE_URL + 'community_characters', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                community_id: this.state.community.id,
                character_id: this.props.activeCharacter.id
            })
        }).then(this.setState({
            members: [...this.state.members, this.props.activeCharacter]
        }))
        this.disable()
    }

    changeView = (view) => {
        this.setState({view})
    }
            
    render(){
        const { community, api_community, members, admins, isMember, view, events, threads } = this.state
        return(
        api_community && members?
        <div className="community-show">
            <CommunityShowHeader 
                
                community={community} 
                api_community={api_community}
            />
                
            <div className="community-show-main-container">
                <div className="community-main-info">
                    <CommunityShowMain 
                        view={view} 
                        community={community} 
                        api_community={api_community}
                        events={events}
                        history={this.props.history}
                        changeView={this.changeView}
                        threads={threads}
                    />
                </div>
                <div id="community-member-list">
                    <MemberList
                        isMember={isMember}  
                        members={members} 
                        admins={admins}
                        join={this.joinCommunity}
                        adminName="Admin" 
                        disabled={this.state.disabled}
                    />  
                </div>
            </div>
        </div>
        :
        <img id="loading" src="/company_loader.png" alt="company_loader"/>
        )
    }
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp)(CommunityShow)