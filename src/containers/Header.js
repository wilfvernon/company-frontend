import React, { Component } from 'react'
import './css/header.css'
import { toggleMenuAction } from '../redux/actions'
import { connect } from 'react-redux'
import HamburgerMenu from 'react-hamburger-menu'

class Header extends Component{

    handleClick = () => {
        this.props.toggleMenuAction();
    }

    render(){
        return (
            <div className="page-header">
                <div id="ham">
                    <HamburgerMenu
                        isOpen={this.props.menuOpen}
                        menuClicked={this.handleClick}
                        width={18}
                        height={15}
                        strokeWidth={2}
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

const msp = (state) => ({
    menuOpen: state.modal.menu
})

export default connect(msp, { toggleMenuAction })(Header)