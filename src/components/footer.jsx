import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    return (
      <div className='footer-container'>
        <div className='footer-links'>
          <div className='footer-link-wrapper'>
            <div className='footer-link-items'>
              <h2>About Us</h2>
              <Link to='/sign-up'>How it works</Link>
              <Link to='/about'>Our mission</Link>
              <Link to='/initiatives'>What we do</Link>
              <Link to='/about'>Our team</Link>
            </div>
            <div className='footer-link-items'>
              <h2>Contact Us</h2>
              <Link to='/contact'>Contact</Link>
              <Link to='/'>FAQ</Link>
            </div>
            <div className='footer-link-items'>
              <h2>Social Media</h2>
              <a href='https://www.instagram.com/codepulse.network/' target='_blank' rel='noopener noreferrer'>Instagram</a>
              <a href='https://www.linkedin.com/company/codepulse-network/' target='_blank' rel='noopener noreferrer'>LinkedIn</a>
            </div>
          </div>
        </div>
        <section className='footer-bottom'> 
          <div className='footer-bottom-wrap'>
            <div className='footer-logo'>
              <Link to='/' className='social-logo'>
                <img src='/logo.png' alt='Logo' className='logo' />
              </Link>
            </div>
            <small className='website-rights'>CodePulseNetwork © 2024</small>
            <div className='social-icons'>
              <a className='social-icon-link instagram' href='https://www.instagram.com/codepulse.network/' target='_blank' aria-label='Instagram' rel='noopener noreferrer'>
                <i className='fab fa-instagram' />
              </a>
              <a className='social-icon-link linkedin' href='https://www.linkedin.com/company/codepulse-network/' target='_blank' aria-label='LinkedIn' rel='noopener noreferrer'>
                <i className='fab fa-linkedin' />
              </a>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Footer;