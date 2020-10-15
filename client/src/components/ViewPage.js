import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as date from '../modules/date';
import * as lawinfo from '../modules/lawinfo';
import './ViewPage.css';

function ViewPage(props) {
  // lawinfo 에 들어와있는데 이걸 어떻게 출력하냐 처리하냐
  // article 조
  // chapter 장
  // clause 항
  // item 목
  // subpara 구칙
  // law 법률 타이틀
  // 그럼 소송법과 소송규칙에 각자 조 장 항 이 있는데,
  // 소송규칙은 lawDetail.law
  // 소송법은 lawDetail.??? 서버에서 아직 안들어옴

  /* 법과 규칙으로 크게 나뉜다. 먼저 검색으로 찾은 법을 누르면 /view 에서 (새창으로) 해당 
  법의 본문을 보여주고 side info 로 시행령과 규칙이 있으면 제한된 정보와 함께 리스트화해 출력
  한다. Side info의 시행령과 규칙 중 원하는 것을 클릭하면 이전과 같이 새창으로 본문을 보여준다.
  */
  const { lawDetail } = props;
  console.log(lawDetail);
  return (
    <div>
      <div className='searched-date'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>{lawDetail.law.name}</div>
        <div className='maininfo-container'>
          <div className='lawtitle'>가사소송법</div>
          <div className='chapter'>제 1편 총칙</div>
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
