import React from 'react';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

function ConvertToPDF() {
  // innerHTML을 이용해 원하는 내용 프린트하는 함수
  function contentPrint() {
    const initBody = document.body.innerHTML;
    // MainInfo 내용만을 담기 (SideInfo, ArticleLink 제외)
    window.onbeforeprint = () => {
      document.body.innerHTML = document.querySelector(
        '.maininfo-container',
      ).innerHTML;
    };
    window.onafterprint = () => {
      document.body.innerHTML = initBody;
    };
    window.print();
    // reload 하지 않고는 버튼이 한번만 작동
    window.location.reload();
  }

  return (
    <div className='pdf-button-container'>
      <MainInfo />
      <div className='pdf-button-wrapper'>
        <button type='button' className='pdf-button' onClick={() => contentPrint()}>
          프린트
        </button>
      </div>
    </div>
  );
}

export default ConvertToPDF;
