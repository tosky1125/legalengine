import React from 'react';
import './Main.css';
import SearchBar from './SearchBar';


function Main() {
  return (
    <div className='main'>
      <div className='main-title'>법령 검색</div>
      <SearchBar />
    </div>
  );
}

export default Main;
