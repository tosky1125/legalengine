import React from 'react';
import './Main.css';
import SearchBar from './SearchBar';
import logo from '../images/logo.svg';
import ConvertToPDF from './ConvertToPDF';

function Main() {
  return (
    <div className='main'>
      <img className='main-logo' src={logo} alt='logo'></img>
      <SearchBar />
      <ConvertToPDF />
    </div>
  );
}

export default Main;
