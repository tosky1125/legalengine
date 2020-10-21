import { PDFExport } from '@progress/kendo-react-pdf';
import React from 'react';
import { format } from 'date-fns';
import './ConvertToPDF.css';

function ConvertToPDF() {
  const dataToConvert = {};
  const exportPDF = () => {
    dataToConvert.save();
  }; //ref={(r) => (resume = r)}
  let law = JSON.parse(localStorage.Law);

  let { Chapter } = law;
  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    <div key={chapEleIndex}>
      <h1 className='pdf-title'>{chapEle.context}</h1>
      <h2 className='pdf-title'>{chapEle.date}</h2>
      {chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          <div key={artEleIndex}>
            <h3 className='pdf-article-title'>
              {artEle.article_title}&nbsp;&nbsp;
            </h3>
            <p>
              <span>{artEle.context}</span>
              <span className='pdf-date'>{artEle.cont_date}</span>
            </p>
            {artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => (
                <div key={claEleIndex}>
                  <span className='pdf-clause-context'>
                    {claEle.context}
                    <span className='pdf-date'>{claEle.date}</span>
                  </span>
                  {claEle.subPara &&
                    claEle.subPara.map((subEle, subEleIndex) => (
                      <div key={subEleIndex}>
                        <span className='pdf-sub-context'>
                          {subEle.context}
                        </span>
                        <span className='pdf-date'>{subEle.date}</span>
                        {subEle.Item &&
                          subEle.Item.map((itEle, itEleIndex) => {
                            if (itEle.context.includes('http')) {
                              return (
                                <img
                                  key={itEleIndex}
                                  className='pdf-img'
                                  src={itEle.context}
                                  alt={itEle.context}
                                ></img>
                              );
                            } else {
                              return (
                                <div key={itEleIndex}>
                                  <span className='pdf-item-context'>
                                    {itEle.context}
                                  </span>
                                  <span className='pdf-date'>{itEle.date}</span>
                                </div>
                              );
                            }
                          })}
                      </div>
                    ))}
                </div>
              ))}
            <p className='pdf-date'>{artEle.date}</p>
          </div>
        ))}
    </div>
  ));

  return (
    <PDFExport
      paperSize={'Letter'}
      fileName='까리용.pdf'
      title=''
      subject=''
      keywords=''
    >
      <div className='pdf'>
        <div className='pdf-container'>
          <button onClick={exportPDF}>download</button>
          <div className='pdf-law-head'>
            <h1>{law.name}</h1>
            <p className='pdf-date'>
              [시행 {format(new Date(law.enforcement_date), 'yyyy.MM.dd.')}] [
              {law.type}&nbsp;
              {law.number}호,&nbsp;
              {format(new Date(law.promulgation_date), 'yyyy.MM.dd.')}
              ,&nbsp;
              {law.amendment_status}]
            </p>
          </div>
          {Chapter}
        </div>
      </div>
    </PDFExport>
  );
}
// x, y 축 테두리 사라지기
// overflowX: 'hidden',
// overflowY: 'hidden',
export default ConvertToPDF;
