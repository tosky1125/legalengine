import React from 'react';
import './Main.css';
import SearchBar from './SearchBar';
import Typist from 'react-typist';

function Main() {
  return (
    <div className='main-container'>
      <h1 className="main-logo">
        <Typist>
          <span className='main-ele'> 국내 최초 시간 기반 법령 검색 사이트 </span>
          <Typist.Backspace count={49} delay={400} />
          <span className='main-ele'> We are Faster </span>
          <Typist.Backspace count={20} delay={200} />
          <span className='main-ele'> We are Easier </span>
          <Typist.Backspace count={20} delay={200} />
          <span className='main-ele-logo'> LegalEngine<span className='main-ele-logo-dot'>. </span></span>
        </Typist>
      </h1>
      <SearchBar />
    </div>
  );
}

export default Main;
