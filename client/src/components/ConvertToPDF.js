import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ConvertToPDF.css';
import MainInfo from './MainInfo';

const ConvertToPDF = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  return (
    <span>
      <span className='pdf-btn-wrapper'>
      <button className='pdf-btn' onClick={handlePrint}>PDF & 프린트</button>
      </span>
      <MainInfo ref={componentRef} />
    </span>
  );
};

export default ConvertToPDF;