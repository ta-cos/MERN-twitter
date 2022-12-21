import { BrowserRouter, Route, Link } from 'react-router-dom';
import React from 'react'

function Navigation() {
    return (
        <nav>
            <h1>Navigation</h1>
            <ul>
                <li>Home</li>
                <li>Explore</li>
                <li>Profile</li>
            </ul>
        </nav>
    )
}

export default Navigation
