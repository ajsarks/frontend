// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './side.css' 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/my-bookings">My Bookings</Link>
                </li>
                <li>
                    <Link to="/my-account">My Account</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
