import React from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import { format } from 'date-fns';
import './ConvertToPDF.css';

function ConvertToPDF() {
  let dataToConvert;
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
    <div>
      <div className='pdf-btn-wrapper'>
        <button
          className='pdf-btn'
          onClick={() => {
            dataToConvert.save();
          }}
        >
          PDF 저장
        </button>
      </div>
      <div style={{ position: 'absolute', left: '-4000px', top: 0 }}>
        <PDFExport
          paperSize='A4'
          margin='1cm'
          fileName={`${law.name}.pdf`}
          ref={(data) => (dataToConvert = data)}
        >
        <meta charset="utf-8" />
          <div className='pdf-container'>
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
        </PDFExport>
      </div>
    </div>
  );
}
// x, y 축 테두리 사라지기
// overflowX: 'hidden',
// overflowY: 'hidden',
export default ConvertToPDF;
