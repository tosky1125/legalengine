import { PDFExport } from '@progress/kendo-react-pdf';
import React from 'react';

function ConvertToPDF() {
  const dataToConvert = {};
  const exportPDF = () => {
    dataToConvert.save();
  }; //ref={(r) => (resume = r)}
  return (
    <PDFExport
      paperSize={'Letter'}
      fileName='${dataToConvert.title}.pdf'
      title=''
      subject=''
      keywords=''
    >
      <div
        style={{
          height: 792,
          width: 612,
          padding: 'none',
          backgroundColor: 'white',
          boxShadow: '5px 5px 5px black',
          margin: 'auto',
          border: '1px solid orange',
        }}
      >
        까리용 pdf
      </div>
    </PDFExport>
  );
}
// x, y 축 테두리 사라지기
// overflowX: 'hidden',
// overflowY: 'hidden',
export default ConvertToPDF;
