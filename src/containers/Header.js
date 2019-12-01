import React, { Component } from 'react'
import './css/header.css'
import { toggleMenuAction } from '../redux/actions'
import { connect } from 'react-redux'
import HamburgerMenu from 'react-hamburger-menu'

class Header extends Component{

    state={
        open: false
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
        this.props.toggleMenuAction();
    }

    render(){
        return (
            <div className="page-header">
                <div id="ham">
                    <HamburgerMenu
                        isOpen={this.state.open}
                        menuClicked={this.handleClick}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color='white'
                        borderRadius={0}
                        animationDuration={0.5}
                    />
                </div>
                <div className="currentChar"></div>
            </div>
        )
    }
}

export default connect(null, { toggleMenuAction })(Header)