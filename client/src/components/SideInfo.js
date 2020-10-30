import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import './SideInfo.css';

/* ADVANCED
법제처 사이트를 기준으로 Side Info는
법령명, 법령본문, 조문내용, 조문제목, 부칙, 제정*개정문 이렇게 총 6 카테고리로 나뉘고
각각의 카테고리를 누르면 다른 결과값을 출력한다.
이 기준이 무엇인지 파악하고 카테고리별 결과값을 출력하는 함수(알고리즘) 작성 요구
*/

function SideInfo(props) {
  const { lawDetail } = props;
  console.log(lawDetail);
  return (
    <>
      <div className='법령명'>
        <div className='법령명-sideinfo-head'>
          <p className='법령명-sideinfo-title'></p>
          <p className='시행일자'></p>
          <p className='법률 번호 공포일 개정'></p>
        </div>
        <div className='법령명-sideinfo-body'>
          <button className='본문'>본문</button>
          <button className='부칙'>부칙</button>
        </div>
      </div>
      <div className='조문내용'>
        <div className='조문내용-sideinfo-head'>
          <p className='조문내용-sideinfo-title'>{lawDetail.law.name}</p>
          <p className='시행일자'></p>
          <p className='법률 번호 공포일 개정'></p>
        </div>
        <div className='조문내용-sideinfo-body'>
          <p className='조'></p>
          <p className='조'></p>
        </div>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    lawDetail: state.lawinfo.lawDetail,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(withRouter(SideInfo));
