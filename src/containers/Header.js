import React from 'react'
import './css/header.css'

const Header = () => {
    return (
        <div className="page-header">
            <img src="company_clear.png" alt="logo"/>
            <img src="ffxiv.png" alt="ffxiv"/>
            <div className="currentChar"></div>
        </div>
    )
}

export default Header