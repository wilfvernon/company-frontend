import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { newEventModal, toggleMenuAction } from '../redux/actions'
import { Link } from 'react-router-dom'
import './css/menu.css'
import { RAILS_BASE_URL } from "../index"
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import SearchResults from '../components/SearchResults'

const searchFetch = (query, controller) => fetch(RAILS_BASE_URL + `/${controller}/search?query=${query}`)
const debouncedSearchFetch = AwesomeDebouncePromise (searchFetch, 500)

class Menu extends Component {

    state={
        events: false,
        communities: false,
        characters: false,
        searchResults: [],
        searchInput: "",
        searchModel: "communities"
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
                <Link onClick={this.props.toggleMenuAction} key={community.id} to={"/communities/" + community.id}>
                    <h4>
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

    handleChange = async event => {
        event.persist();
        this.setState({ searchInput: event.target.value })
        let results = await debouncedSearchFetch(event.target.value, this.state.searchModel)
        results = await results.json()
        this.setState({ searchResults: results })
    }

    render(){
        return (
        <div className="page-menu">
            <img id="company-logo" src='/company_clear_reactor.png' alt="active-character"/>
            <div id="menu-items">
                <div className="category">
                    <input id="search-input" type="text" placeholder="Search" onChange={this.handleChange} value={this.state.searchInput}/>
                </div>
                {this.state.searchResults.length?
                <SearchResults results={this.state.searchResults} model={this.state.searchModel}/>
                :null}
                <hr/>
                <div className="category">
                    <div className="header">
                        <Link onClick={this.props.toggleMenuAction} to="/calendar"><h2>Calendar</h2></Link>
                    </div>
                </div>
                <hr/>
                <div className="category">
                    <div className="header">
                        <h2 className="title">Characters</h2>
                        <h2 id="characters" onClick={this.toggleCollapse} className="expand">
                            {this.state.characters?"-":"+"}
                        </h2>
                    </div>
                    {this.state.characters?
                    <ul className="sub-menu">
                        <div id="active-character-sub-menu">
                            <p>Logged in with {this.props.activeCharacter.name}</p>
                            <img id="active-character-image" src={this.props.activeCharacter.profile_image} alt="active-character"/>
                        </div>
                    </ul>:
                    null}
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
            </div>
        </div>
        )
    }
}

const msp = (state) => ({
    communities: state.communities.account,
    activeCharacter: state.characters.accountPrimary
})

export default connect(msp, { newEventModal, toggleMenuAction })(Menu)