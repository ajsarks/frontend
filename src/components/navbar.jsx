import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported
import './navbar.css';
import { Button } from './button';
import { AuthContext } from '../context/auth';
import { FaUser } from 'react-icons/fa';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const { email, dispatch } = useContext(AuthContext); // Access the email and dispatch from AuthContext
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        closeMobileMenu();
        navigate('/'); // Navigate to home on logout
    };

    useEffect(() => {
        const showButton = () => {
            if (window.innerWidth <= 960) {
                setButton(false);
            } else {
                setButton(true);
            }
        };

        showButton();
        window.addEventListener('resize', showButton);
        return () => window.removeEventListener('resize', showButton);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <img src='/logo.png' alt='Logo' className='logo' />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {email ? (
                        <>
                            <li className='nav-item'>
                                <Link to='/my-bookings' className="nav-links" onClick={closeMobileMenu}>
                                    <FaUser className="user-icon" />
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <button className="nav-links" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='nav-item'>
                                <Link to='/Register' className="nav-links" onClick={closeMobileMenu}>
                                    Register
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/Login' className="nav-links" onClick={closeMobileMenu}>
                                    Log in
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
                {button && (
                    <div className="navbar-buttons">
                        {email ? (
                            <>
                                <Link to='/my-bookings' className="nav-links">
                                    <FaUser className="user-icon" />
                                </Link>
                                <Button onClick={handleLogout} buttonStyle='btn--outline' padding='1.2vh 4vh' fontSize='2vh'>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button to='/Register' buttonStyle='btn--outline' padding='1.2vh 4vh' fontSize='2vh'>
                                    Register
                                </Button>
                                <Button to='/login' buttonStyle='btn--outline' padding='1.2vh 4.5vh' fontSize='2vh'>
                                    Log in
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;