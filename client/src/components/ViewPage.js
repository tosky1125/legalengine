import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as date from '../modules/date';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import './ViewPage.css';
<<<<<<< HEAD
import SearchBar from './SearchBar';

function ViewPage(props) {
  
  // const { lawDetail } = props;
  const lawDetail = {
    "Law": {
        "law_id": 615,
        "number": 73554,
        "name": "가사소송규칙",
        "promulgation_date": "2006-03-23T00:00:00.000Z",
        "type": "대법원규칙",
        "promulgation_number": 2009,
        "enforcement_date": "2006-04-01T00:00:00.000Z",
        "amendment_status": "일부개정",
        "ministry": "대법원",
        "context": null,
        "Chapter": [
            {
                "id": 9780,
                "chapter_id": "1:0",
                "law_id": 619,
                "date": "<개정 2010. 3. 31.>",
                "context": "1편 총칙  ",
                "Article": [
                    {
                        "id": 49906,
                        "article_id": "1:0",
                        "law_id": 619,
                        "chapter_id": 9780,
                        "article_title": "제1조(목적)",
                        "date": "[전문개정 2010. 3. 31.]",
                        "context": "   이 법은 인격의 존엄과 남녀 평등을 기본으로 하고 가정의 평화 및 친족 간에 서로 돕는 미풍양속을 보존하고 발전시키기 위하여 가사(家事)에 관한 소송(訴訟)과 비송(非訟) 및 조정(調停)에 대한 절차의 특례를 규정함을 목적으로 한다.",
                        "flag_pan": null,
                        "flag_yeon": null,
                        "flag_hang": null,
                        "flag_gyu": null,
                        "Clause": [
                            {
                                "id": 62359,
                                "clause_id": "1",
                                "law_id": 619,
                                "chapter_id": "9780",
                                "article_id": 49907,
                                "date": "<개정 2013. 4. 5., 2013. 7. 30., 2014. 10. 15., 2016. 12. 2., 2017. 10. 31.>",
                                "context": "   ① 다음 각 호의 사항(이하 \"가사사건\"이라 한다)에 대한 심리(審理)와 재판은 가정법원의 전속관할(專屬管轄)로 한다.  ",
                                "subPara": [
                                    {
                                        "id": 53033,
                                        "sub_id": "1",
                                        "law_id": 619,
                                        "chapter_id": "9780",
                                        "article_id": "49907",
                                        "clause_id": 62359,
                                        "date": null,
                                        "context": "  1. 가사소송사건",
                                        "Item": [
                                            {
                                                "id": 4120,
                                                "item_id": "1",
                                                "law_id": 619,
                                                "chapter_id": "9780",
                                                "article_id": "49907",
                                                "clause_id": "62359",
                                                "sub_id": 53033,
                                                "date": null,
                                                "context": "    가. 가류(類) 사건"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
  };
  
  let { Chapter } = lawDetail.Law;

  return (
    <div>
      <div className='searched-date'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>
          {/* <SideInfo /> */}
        </div>
        <div className='maininfo-container'>
          <div className='lawtitle'>{lawDetail.Law.name}</div>
          {Chapter.map(chapEle => (
            <div><h1>{chapEle.context}</h1><h2>{chapEle.date}</h2>
              {chapEle.Article && chapEle.Article.map(artEle => (
                <div>
                <h3>{artEle.article_title}</h3>
                {artEle.Clause && artEle.Clause.map(claEle => (
                  <div>
                    <span>{claEle.context}</span><span>{claEle.date}</span>
                    {claEle.subPara && claEle.subPara.map(subEle => (
                      <div><span>{subEle.context}</span><span>{subEle.date}</span>
                        {subEle.Item && subEle.Item.map(itEle => (
                        <div><span>{itEle.context}</span><span>{itEle.date}</span></div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <span>{artEle.date}</span>
                </div>
              ))}
            </div>
          ))}
=======
import { format } from 'date-fns';
import ConvertToPDF from './ConvertToPDF';
import Modal from './Modal';

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
            <p>
              <span>{artEle.context}</span>
              <span className='viewpage-artdate'>{artEle.cont_date}</span>
            </p>
            {artEle.Clause &&
              artEle.Clause.map((claEle, claEleIndex) => {
                return (
                  <div key={claEleIndex}>
                    <div className='clause-wrapper'>
                      <span
                        className='clause-context'
                        dangerouslySetInnerHTML={{ __html: claEle.context }}
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
                                __html: subEle.context,
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
                                          __html: itEle.context,
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
>>>>>>> b6160c374b429d2a9ab30902ad5aa08885241fc5
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    lawDetail: state.lawinfo.lawDetail,
    date: state.date.date,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
    date: (data) => dispatch(date.date(data)),
  })
)(withRouter(ViewPage));
