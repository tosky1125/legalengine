import React from 'react';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

const ConvertToPDF = (props) => {
  const { name, lawNum, enfDate } = props;

  return (
    <div className='pdf-btn-form'>
      <div className='pdf-btn-wrapper'>
        <button className='pdf-btn' onClick={() => window.print()}>
          PDF & 프린트
        </button>
      </div>
      <MainInfo
        name={name}
        lawNum={lawNum}
        enfDate={enfDate}
      />
    </div>
  );
};

export default ConvertToPDF;
