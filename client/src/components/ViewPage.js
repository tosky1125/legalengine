import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as date from '../modules/date';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import './ViewPage.css';
import SearchBar from './SearchBar';

function ViewPage(props) {
  
  const { lawDetail } = props;
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
                <h3>{artEle.article_title}</h3><p>{artEle.context}</p>
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
                <p>{artEle.date}</p>
                </div>
              ))}
            </div>
          ))}
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
