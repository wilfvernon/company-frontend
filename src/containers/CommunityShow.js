import React, { Component } from 'react'
import { RAILS_BASE_URL, FFXIV_API_BASE_URL } from '../index'
import CommunityShowHeader from '../components/CommunityShowHeader'
import CommunityShowProfile from '../components/CommunityShowProfile'
import UpcomingEvents from './UpcomingEvents'
import './css/communityShow.css'

class CommunityShow extends Component {

    state={
        community: null,
        api_community: null
    }

    componentDidMount(){
        console.log(this.props.id)
        fetch(RAILS_BASE_URL + "communities/" + this.props.id)
        .then(res=>res.json())
        .then((fc)=>{
            this.setState({
            community: fc
        })
        if(this.state.community.category === "FC"){
            fetch(FFXIV_API_BASE_URL + "freecompany/" + this.state.community.api_id)
            .then(res=>res.json())
            .then((fc)=>this.setState({api_community: fc["FreeCompany"]}))
            }}   
        )
    }
            
    render(){
        const { community, api_community } = this.state
        console.log(this.state)
        return(
        community?
        <div className="community-show">
            <CommunityShowHeader community={community} api_community={api_community}/>
            <div className="community-show-main">
                <span id="server">{community.server}</span>
                <div className="community-main-info">
                    <CommunityShowProfile community={community} api_community={api_community}/>
                    <UpcomingEvents/>
                </div>
            </div>
        </div>
        :
        <h1>Loading</h1>
        )
    }
}

export default CommunityShow