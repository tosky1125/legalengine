import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as date from '../modules/date';
import * as lawinfo from '../modules/lawinfo';

function SideInfo(props) {
  const { lawDetail } = props;
  console.log(lawDetail);
  return (
    <>
      <ol className='법령명'>
        <div className='법령명-sideinfo-head'>
          <li className='법령명-sideinfo-title'></li>
          <li className='시행일자'></li>
          <li className='법률 번호 공포일 개정'></li>
        </div>
        <div className='법령명-sideinfo-body'>
          <button className='본문'>본문</button>
          <button className='부칙'>부칙</button>
        </div>
      </ol>
      <ol className='조문내용'>
        <div className='조문내용-sideinfo-head'>
          <li className='조문내용-sideinfo-title'>{lawDetail.law.name}</li>
          <li className='시행일자'></li>
          <li className='법률 번호 공포일 개정'></li>
        </div>
        <div className='조문내용-sideinfo-body'>
          <li className='조'></li>
          <li className='조'></li>
        </div>
      </ol>
    </>
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
)(withRouter(SideInfo));
