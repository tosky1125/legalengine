import React from 'react';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

function ConvertToPDF(props) {
  const { name, lawNum, enfDate } = props;
  
  return (
    <div className='pdf-button-form'>
      <div className='pdf-button-wrapper'>
        <button className='pdf-button'
        onClick={() => window.print()}>
          PDF & 프린트
        </button>
      </div>
      <MainInfo name={name} lawNum={lawNum} enfDate={enfDate} />
    </div>
  );
}

export default ConvertToPDF;
