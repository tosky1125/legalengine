import React from 'react';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

function ConvertToPDF() {
  function content_print() {
    const initBody = document.body.innerHTML;
    window.onbeforeprint = function () {
      document.body.innerHTML = document.querySelector(
        '.maininfo-container'
      ).innerHTML;
    };
    window.onafterprint = function () {
      document.body.innerHTML = initBody;
    };
    window.print();
    window.location.reload();
  }

  return (
    <div className='pdf-button-form'>
      <div className='pdf-button-wrapper'>
        <button className='pdf-button' onClick={() => content_print()}>
          프린트
        </button>
      </div>
      <MainInfo />
    </div>
  );
}

export default ConvertToPDF;
