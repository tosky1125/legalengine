import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import './ViewPage.css';
import { format } from 'date-fns';

function ViewPage(props) {  
  const { lawDetail } = props;
  console.log(lawDetail);

  let test = JSON.parse(localStorage.lawdata2);
  console.log(test);
  console.log(typeof test);
  let { Chapter } = test.Law;


  return (
    <div>
      <div className='searched-date'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>{/* <SideInfo /> */}</div>
        <div className='maininfo-container'>
          <div className='law-head'>
            <h1>{test.Law.name}</h1>
            <p>
              [시행 {format(new Date(test.Law.enforcement_date), 'yyyy.MM.dd.')}
              ] [{test.Law.type}&nbsp;
              {test.Law.number}호,&nbsp;
              {format(new Date(test.Law.promulgation_date), 'yyyy.MM.dd.')}
              ,&nbsp;
              {test.Law.amendment_status}]
            </p>
          </div>
          {Chapter.map((chapEle) => (
            <div>
              <h1>{chapEle.context}</h1>
              <h2>{chapEle.date}</h2>
              {chapEle.Article &&
                chapEle.Article.map((artEle) => (
                  <div>
                    <h3>{artEle.article_title}</h3>
                    
                    {artEle.flag_pan && <button>판</button>}
                    {artEle.flag_yeon && <button>연</button>}
                    {artEle.flag_hang && <button>항</button>}
                    {artEle.flag_gyu && <button>규</button>}
                    <p>{artEle.context}</p>
                    {artEle.Clause &&
                      artEle.Clause.map((claEle) => (
                        <div>
                          <span>{claEle.context}</span>
                          <span>{claEle.date}</span>
                          {claEle.subPara &&
                            claEle.subPara.map((subEle) => (
                              <div>
                                <span>{subEle.context}</span>
                                <span>{subEle.date}</span>
                                {subEle.Item &&
                                  subEle.Item.map((itEle) => {
                                    if(itEle.context.includes('http')){
                                      return <img src={itEle.context}></img>
                                    }
                                    else {
                                      return(
                                    <div>
                                      <span>{itEle.context}</span>
                                      <span>{itEle.date}</span>
                                    </div>
                                  )}})}
                              </div>
                            ))}
                        </div>
                      ))}
                    <p>{artEle.date}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className='credits text-center'>
        <p>
          <a href='/'>주식회사 까리용</a>
        </p>
        <p>© 2019 Carillon Inc., All rights reserved.</p>
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
/* {
  "law": {
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
    "chapter": [
      {
        "id": 9780,
        "chapter_id": "1:0",
        "law_id": 619,
        "date": "<개정 2010. 3. 31.>",
        "context": "1편 총칙  ",
        "article": [
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
            "clause": [
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
                    "item": [
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
} */
