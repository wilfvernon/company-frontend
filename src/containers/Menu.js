import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { newEventModal } from '../redux/actions'
import { Link } from 'react-router-dom'
import './css/menu.css'

class Menu extends Component {

    state={
        events: false,
        communities: false
    }

    toggleCollapse = (e) => {
        e.persist()
        this.setState(prevState=>({
            [e.target.id]: !prevState[e.target.id]
        }))
    }

    communityImageRender = (community) => {
        return(
            <Fragment>
                <img style={{zIndex: 0}} src={community.image_base} alt={`${community.name}-img`}/>
                <img style={{zIndex: 1}} src={community.image_mid} alt={`${community.name}-img`}/>
                <img style={{zIndex: 2}} src={community.image_top} alt={`${community.name}-img`}/>
            </Fragment>
        )
    }

    renderCommunities = () => {
        return this.props.communities.map(community=>{
            return(
                <Link to={"/communities/" + community.id}>
                    <h4 key={community.id}>
                        <div className="community-image">
                            {community.category === "FC" ? 
                                this.communityImageRender(community)
                                :
                                <img src={community.image_base} alt={`${community.name}-img`}/>
                            }
                        </div>
                        <span className="community-name">{community.name}</span>
                    </h4>
                </Link>
            )
        })
    }

    render(){
        return (
        <div className="page-menu">
            <div className="category">
                <input id="search-input" type="text" placeholder="Search (not implemented)"/>
            </div>
            <hr/>
            <div className="category">
                <Link to="/calendar"><h2>Calendar</h2></Link>
            </div>
            <hr/>

            <div className="category">
                <div className="header">
                    <h2 className="title">Events</h2>
                    <h2 id="events" onClick={this.toggleCollapse} className="expand">
                        {this.state.events?"-":"+"}
                    </h2>
                </div>
                {this.state.events?
                <ul className="sub-menu">
                    <h4 className="modal-link" onClick={this.props.newEventModal}>Add an event</h4>
                </ul>
                : null}
            </div>
            <hr/>
            <div className="category">
                <div className="header">
                    <h2 className="title">Communities</h2>
                    <h2 id="communities" onClick={this.toggleCollapse} className="expand">
                        {this.state.communities?"-":"+"}
                    </h2>
                </div>
                {this.state.communities?
                <ul className="sub-menu">
                    {this.renderCommunities()}
                </ul>
                : null}
            </div>
            <hr/>
        </div>
        )
    }
}

const msp = (state) => ({
    communities: state.communities.account
})

export default connect(msp, { newEventModal })(Menu)