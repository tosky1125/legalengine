import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

const ConvertToPDF = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { name, lawNum, enfDate } = props;

  return (
    <div className='pdf-btn-form'>
      <div className='pdf-btn-wrapper'>
        <button className='pdf-btn' onClick={handlePrint}>
          PDF & 프린트
        </button>
      </div>
      <MainInfo
        ref={componentRef}
        name={name}
        lawNum={lawNum}
        enfDate={enfDate}
      />
    </div>
  );
};

export default ConvertToPDF;
