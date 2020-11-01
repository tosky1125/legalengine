import React from 'react';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

function ConvertToPDF() {
  function contentPrint() {
    const initBody = document.body.innerHTML;
    window.onbeforeprint = () => {
      document.body.innerHTML = document.querySelector(
        '.maininfo-container',
      ).innerHTML;
    };
    window.onafterprint = () => {
      document.body.innerHTML = initBody;
    };
    window.print();
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
