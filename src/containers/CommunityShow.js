import React, { Component } from 'react'
import { RAILS_BASE_URL, FFXIV_API_BASE_URL } from '../index'
import { connect } from 'react-redux'
import CommunityShowHeader from '../components/CommunityShowHeader'
import CommunityShowProfile from '../components/CommunityShowProfile'
import MemberList from '../components/MemberList'
import UpcomingEvents from './UpcomingEvents'
import './css/communityShow.css'

class CommunityShow extends Component {

    state={
        community: null,
        api_community: null,
        members: null
    }

    componentDidMount(){
        fetch(RAILS_BASE_URL + "communities/" + this.props.id)
        .then(res=>res.json())
        .then((fc)=>{
            this.setState({
            community: fc.community,
            members: fc.characters
        })
        if(this.state.community.category === "FC"){
            fetch(FFXIV_API_BASE_URL + "freecompany/" + this.state.community.api_id)
            .then(res=>res.json())
            .then((fc)=>this.setState({api_community: fc["FreeCompany"]}))
            }}   
        )
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
    }
            
    render(){
        const { community, api_community, members } = this.state
        return(
        community && members?
        <div className="community-show">
            <CommunityShowHeader community={community} api_community={api_community}/>
            <div className="community-show-main">
                <span id="server">{community.server}</span>
                <div className="community-main-info">
                    <CommunityShowProfile community={community} api_community={api_community}/>
                    <UpcomingEvents/>
                    <MemberList join={this.joinCommunity} members={members}/>
                </div>
            </div>
        </div>
        :
        <h1>Loading</h1>
        )
    }
}

const msp = (state) => ({
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp)(CommunityShow)