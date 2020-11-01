import React from 'react';
import './Main.css';
import Typist from 'react-typist';
import SearchBar from '../components/SearchBar';

function Main() {
  // Typist 라이브러리 이용 메인페이지 typo 애니메이션 적용
  return (
    <div className='main-container'>
      <h1 className='main-logo'>
        <Typist avgTypingSpeed={20} cursor={{ hideWhenDone: true }}>
          <span className='main-ele'> 빠르고 간편한 </span>
          <Typist.Backspace count={30} delay={150} />
          <span className='main-ele'> 시간 기반 법령 검색 </span>
          <Typist.Backspace count={30} delay={200} />
          <span className='main-ele-logo'>
            LegalEngine
            <span className='main-ele-logo-dot'>. </span>
          </span>
        </Typist>
      </h1>
      <SearchBar />
    </div>
  );
}

export default Main;
