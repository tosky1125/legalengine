import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ConvertToPDF.css';
import MainInfo2 from './maininfo2';

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
      <MainInfo2
        ref={componentRef}
        name={name}
        lawNum={lawNum}
        enfDate={enfDate}
      />
    </div>
  );
};

export default ConvertToPDF;
