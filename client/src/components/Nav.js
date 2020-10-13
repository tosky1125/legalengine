import React from 'react';
import logo from '../images/logo.svg';
import './Nav.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='nav-form'>
      <Link to='/'>
        <img className='nav-logo' src={logo} alt='logo'></img>
      </Link>
    </div>
  );
}

export default NavBar;
