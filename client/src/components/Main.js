import React from 'react';
import './Main.css';
import SearchBar from './SearchBar';
import logo from '../images/logo.svg';
function Main() {
  return (
    <div className='main'>
      <img className='main-logo' src={logo} alt='logo'></img>
      <SearchBar />
    </div>
  );
}

export default Main;
