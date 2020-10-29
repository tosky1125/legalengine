import React from 'react';
import './Main.css';
import SearchBar from './SearchBar';
import Typist from 'react-typist';

function Main() {
  return (
    <div className='main-container'>
      <h1 className="main-logo">
        <Typist>
        <span className='main-ele'> 빠르고 간편한 </span>
          <Typist.Backspace count={30} delay={200} />
          <span className='main-ele'> 시간 기반 법령 검색 </span>
          <Typist.Backspace count={30} delay={200} />
          <span className='main-ele-logo'> LegalEngine<span className='main-ele-logo-dot'>. </span></span>
        </Typist>
      </h1>
      <SearchBar />
    </div>
  );
}

export default Main;
