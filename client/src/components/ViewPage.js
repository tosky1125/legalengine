import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import './ViewPage.css';
import { format } from 'date-fns';
import ConvertToPDF from './ConvertToPDF';
import Modal from './Modal';
import axios from 'axios';

function ViewPage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  let law = JSON.parse(localStorage.Law);
  console.log(law);

  let { Chapter } = law;
  const keyword = JSON.parse(localStorage.searchWord); 
  const searchDate = JSON.parse(localStorage.searchDate);
  // '구조'
  const regex = new RegExp(keyword,'g');
  const lawRegex = new RegExp(/\「(.*?)\」/);

  const joSlicer = (strFrom) => {
    const str = String(strFrom);
    if (str.includes(':')) {
      const splited = str.split(':');
      const joRaw = splited[0];
      const joBrRaw = splited[1];
      const joNo = '0'.repeat(4 - joRaw.length) + joRaw;
      const joBrNo = '0'.repeat(2 - joBrRaw.length) + joBrRaw;
      return [joNo, joBrNo];
    } else {
      return ['0', '0'];
    }
  };
  const handleClickSearch = (e) => {
    
  };
  const relatedLaw = (context) => {
    
    const selectedLaw = lawRegex.test(context) ? context.match(lawRegex)[1] : null;
    console.log(selectedLaw)
    if(selectedLaw){
      const inTagLaw = lawRegex.test(context) ? context.match(lawRegex)[0] : null;
      context = context.replace(lawRegex,`<span onclick=fetch('http://13.125.112.243')>${inTagLaw}</span>`);
    }
    console.log(context)
    return context;
  };
  
    
  // {artEle.article_title} 조문 위치
  // const handleSearchArticle = () => {};

  // const joSplitDate = (context)=> {

  //   const date = null;
  //   if(context){
  //     const check = context.indexOf('<개정');
  //     if(check !== -1){
  //       date = context.slice(check);
  //       context = context.sliviewpage-ce(0,check);
  //     }
  //   };
  //   console.log(context, `this is ${date}`);
  //   return { context, date };
  // }

  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    <div key={chapEleIndex}>
      <h1 className='viewpage-title'>{chapEle.context}</h1>
      <h2 className='viewpage-chapdate'>{chapEle.date}</h2>
      {chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          <div key={artEleIndex}>
            <h3 className='viewpage-article-title'>
              {artEle.article_title}&nbsp;&nbsp;
            </h3>
            <span className='viewpage-buttons'>
              {artEle.flag_pan && (
                <button className='viewpage-buttons-pan'>
                  <a
                    href={`http://www.law.go.kr/LSW/joStmdInfoP.do?lsiSeq=200188&joNo=${
                      joSlicer(artEle.article_id)[0]
                    }&joBrNo=${joSlicer(artEle.article_id)[1]}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    판
                  </a>
                </button>
              )}
              {artEle.flag_yeon && (
                <button className='viewpage-buttons-yeon'>
                  {/* <a 
                    href='http://www.law.go.kr/LSW/lsJoHstProc.do?lsid={추후삽입}&lsiSeq={Law.number}&joNo=0002&joBrNo=00&lType=0002'
                    target='_blank'
                  >                   
                  </a> */}
                  {/* javascript:fJoHstShow(this,'000695','216111','58955861','010202'); */}
                  연
                </button>
              )}
              {artEle.flag_hang && (
                <button className='viewpage-buttons-hang'>
                  {/* <a
                    href='http://www.law.go.kr/LSW/conAdmrulByLsPop.do?&lsiSeq={Law.number}&joNo={조(0001)}&joBrNo={조 하위}&datClsCd=010102&dguBun=DEG'
                    target='_blank'
                  ></a> */}
                  행
                </button>
              )}
              {artEle.flag_gyu && (
                <button className='viewpage-buttons-gyu'>
                  {/* <a
                    href='http://www.law.go.kr/LSW/lsCtlInfListR.do?lsiSeq={law.number}&lsId={추후삽입}&joNo=0001&joBrNo=00'
                    target='_blank'
                  ></a> */}
                  규
                </button>
              )}
            </span>
            
              <span dangerouslySetInnerHTML={{ __html: artEle.context && relatedLaw(artEle.context).replace(regex, `<span class='keyword-highlight'>${keyword}</span>`)}}></span>
            <span className='viewpage-artdate'>{artEle.cont_date}</span>
            {artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => {
                return (
                  <div key={claEleIndex}>
                    <div className='clause-wrapper'>
                      <span
                        className='clause-context'
                        dangerouslySetInnerHTML={{ __html: claEle.context && claEle.context.replace(regex, `<span class='keyword-highlight'>${keyword}</span>`) }}
                      ></span>
                      <span className='date'>{claEle.date}</span>
                    </div>
                    {claEle.subPara &&
                      claEle.subPara.map((subEle, subEleIndex) => {
                        return (
                          <div key={subEleIndex}>
                            <span
                              className='sub-context'
                              dangerouslySetInnerHTML={{
                                __html: subEle.context && subEle.context.replace(regex, `<span class='keyword-highlight'>${keyword}</span>`),
                              }}
                            ></span>
                            <span className='date'>{subEle.date}</span>
                            {subEle.Item &&
                              subEle.Item.map((itEle, itEleIndex) => {
                                if (itEle.context.includes('http')) {
                                  return (
                                    <img
                                      key={itEleIndex}
                                      className='img'
                                      src={itEle.context}
                                      alt={itEle.context}
                                    ></img>
                                  );
                                } else {
                                  return (
                                    <div key={itEleIndex}>
                                      <span
                                        className='item-context'
                                        dangerouslySetInnerHTML={{
                                          __html: itEle.context && itEle.context.replace(regex, `<span class='keyword-highlight'>${keyword}</span>`),
                                        }}
                                      ></span>
                                      <span className='date'>{itEle.date}</span>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            <p className='date'>{artEle.date}</p>
          </div>
        ))}
    </div>
  ));
  console.log(Chapter);
  return (
    <div>
      <div className='viewpage-container'>
        <div className='viewpage-sideinfo-container'>
          <SideInfo />
        </div>
        <div className='viewpage-maininfo-container'>
          <button onClick={openModal}>PDF</button>
          {modalIsOpen && (
            <Modal
              visible={modalIsOpen}
              closable={true}
              maskClosable={true}
              onClose={closeModal}
            >
              <ConvertToPDF />
            </Modal>
          )}
          <div className='viewpage-law-head'>
            <h1>{law.name}</h1>
            <p className='viewpage-date'>
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
    </div>
  );
}

export default connect(
  (state) => ({
    lawDetail: state.lawinfo.lawDetail,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(withRouter(ViewPage));
