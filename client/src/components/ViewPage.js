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
  Chapter = Chapter.map((chapEle) => (
    <div>
      <h1 className='title'>{chapEle.context}</h1>
      <h2 className='title'>{chapEle.date}</h2>
      {chapEle.Article &&
        chapEle.Article.map((artEle) => (
          <div>
            <h3 className='title'>{artEle.article_title}</h3>
            <div className='buttons'>
            {artEle.flag_pan && <button>판</button>}
            {artEle.flag_yeon && <button>연</button>}
            {artEle.flag_hang && <button>항</button>}
            {artEle.flag_gyu && <button>규</button>}
            </div>
            <p>{artEle.context}</p>
            {artEle.Clause &&
              artEle.Clause.map((claEle) => (
                <div>
                  <span>{claEle.context}</span>
                  <span className='date'>{claEle.date}</span>
                  {claEle.subPara &&
                    claEle.subPara.map((subEle) => (
                      <div>
                        <span>{subEle.context}</span>
                        <span className='date'>{subEle.date}</span>
                        {subEle.Item &&
                          subEle.Item.map((itEle) => {
                            if (itEle.context.includes('http')) {
                              return (
                                <img
                                  src={itEle.context}
                                  alt={itEle.context}
                                ></img>
                              );
                            } else {
                              return (
                                <div>
                                  <span>{itEle.context}</span>
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
  ))

  return (
    <div>
      <div className='searched-date'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>{/* <SideInfo /> */}</div>
        <div className='maininfo-container'>
          <div className='law-head'>
            <h1>{test.Law.name}</h1>
            <p className='date'>
              [시행 {format(new Date(test.Law.enforcement_date), 'yyyy.MM.dd.')}
              ] [{test.Law.type}&nbsp;
              {test.Law.number}호,&nbsp;
              {format(new Date(test.Law.promulgation_date), 'yyyy.MM.dd.')}
              ,&nbsp;
              {test.Law.amendment_status}]
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
