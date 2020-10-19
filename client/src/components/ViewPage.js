import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import './ViewPage.css';
import { format } from 'date-fns';

function ViewPage() {
  let law = JSON.parse(localStorage.Law);
  console.log(law);

  let { Chapter } = law;

  let joSlicer = (strFrom) => {
    let str = String(strFrom);
    if (str.includes(':')) {
      let splited = str.split(':');
      let joRaw = splited[0];
      let joBrRaw = splited[1];
      let joNo = '0'.repeat(4 - joRaw.length) + joRaw;
      let joBrNo = '0'.repeat(2 - joBrRaw.length) + joBrRaw;
      return [joNo, joBrNo];
    } else {
      return ['0', '0'];
    }
  };
  // const joSplitDate = (context)=> {

  //   let date = null;
  //   if(context){
  //     let check = context.indexOf('<개정');
  //     if(check !== -1){
  //       date = context.slice(check);
  //       context = context.slice(0,check);
  //     }
  //   };
  //   console.log(context, `this is ${date}`);
  //   return { context, date };
  // }
  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    <div key={chapEleIndex}>
      <h1 className='title'>{chapEle.context}</h1>
      <h2 className='title'>{chapEle.date}</h2>
      {chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          <div key={artEleIndex}>
            <h3 className='article-title'>
              {artEle.article_title}&nbsp;&nbsp;
            </h3>
            <span className='buttons'>
              {artEle.flag_pan && (
                <button className='buttons-pan'>
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
                <button className='buttons-yeon'>
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
                <button className='buttons-hang'>
                  {/* <a
                    href='http://www.law.go.kr/LSW/conAdmrulByLsPop.do?&lsiSeq={Law.number}&joNo={조(0001)}&joBrNo={조 하위}&datClsCd=010102&dguBun=DEG'
                    target='_blank'
                  ></a> */}
                  행
                </button>
              )}
              {artEle.flag_gyu && (
                <button className='buttons-gyu'>
                  {/* <a
                    href='http://www.law.go.kr/LSW/lsCtlInfListR.do?lsiSeq={law.number}&lsId={추후삽입}&joNo=0001&joBrNo=00'
                    target='_blank'
                  ></a> */}
                  규
                </button>
              )}
            </span>
            <p>
              <span>{artEle.context}</span>
              <span className='date'>{artEle.cont_date}</span>
            </p>
            {artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => (
                <div key={claEleIndex}>
                  <span className='clause-context'>
                    {claEle.context}
                    <span className='date'>{claEle.date}</span>
                  </span>
                  {claEle.subPara &&
                    claEle.subPara.map((subEle, subEleIndex) => (
                      <div key={subEleIndex}>
                        <span className='sub-context'>{subEle.context}</span>
                        <span className='date'>{subEle.date}</span>
                        {subEle.Item &&
                          subEle.Item.map((itEle) => {
                            if (itEle.context.includes('http')) {
                              return (
                                <div>
                                  <img
                                    className='img'
                                    src={itEle.context}
                                    alt={itEle.context}
                                  ></img>
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <span className='item-context'>
                                    {itEle.context}
                                  </span>
                                  <span className='date'>{itEle.date}</span>
                                </div>
                              );
                            }
                          })}
                      </div>
                    ))}
                </div>
              ))}
            <p className='date'>{artEle.date}</p>
          </div>
        ))}
    </div>
  ));

  return (
    <div>
      <div className='view-container'>
        <div className='sideinfo-container'>
          <SideInfo />
        </div>
        <div className='maininfo-container'>
          <div className='law-head'>
            <h1>{law.name}</h1>
            <p className='date'>
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
