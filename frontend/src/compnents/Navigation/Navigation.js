import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import React from 'react'
import './Navigation.css'

function Navigation() {
    return (
        <nav className='nav-content'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/explore'>Explore</NavLink></li>
            <li><NavLink to='/profile'>Profile</NavLink></li>
        </nav>
    )
}

export default Navigation
