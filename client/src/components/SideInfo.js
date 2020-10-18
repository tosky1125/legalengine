import React from 'react';
import { connect } from 'react-redux';
import * as lawinfo from '../modules/lawinfo';
import './SideInfo.css';
import { format } from 'date-fns';

/* ADVANCED
법제처 사이트를 기준으로 Side Info는
법령명, 법령본문, 조문내용, 조문제목, 부칙, 제정*개정문 이렇게 총 6 카테고리로 나뉘고
각각의 카테고리를 누르면 다른 결과값을 출력한다.
이 기준이 무엇인지 파악하고 카테고리별 결과값을 출력하는 함수(알고리즘) 작성 요구
*/

function SideInfo(props) {
  const { lawDetail } = props;
  console.log(lawDetail);
  let sideInfoData = JSON.parse(localStorage.lawdata2).Related;
  console.log(sideInfoData);
  /*for (let i = 0; i < array.length; i++) {
    <>
      <li>{sideInfoData[i].name}</li>
      <p className='date'>
        [시행{' '}
        {format(new Date(sideInfoData[i].enforcement_date), 'yyyy.MM.dd.')}] [
        {sideInfoData[i].type}&nbsp;
        {sideInfoData[i].number}호,&nbsp;
        {format(new Date(sideInfoData[i].promulgation_date), 'yyyy.MM.dd.')}
        ,&nbsp;
        {sideInfoData[i].amendment_status}]
      </p>
    </>;
  } */
  /* <div className='법령명'>
        <ol className='법령명-sideinfo-head'>
          <li className='법령명-sideinfo-title'>{sideInfoData[0].name}</li>
          <li className='시행일자'></li>
          <li className='법률 번호 공포일 개정'></li>
        </ol>
        <div className='법령명-sideinfo-body'>
          <button className='본문'>본문</button>
          <button className='부칙'>부칙</button>
        </div>
      </div>
      <div className='조문내용'>
        <div className='조문내용-sideinfo-head'>
          <li className='조문내용-sideinfo-title'></li>
          <li className='시행일자'></li>
          <li className='법률 번호 공포일 개정'></li>
        </div>
        <div className='조문내용-sideinfo-body'>
          <li className='조'></li>
          <li className='조'></li>
        </div>
      </div>
      */
  if (sideInfoData.length === 0) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }
  return (
    <div>
      {sideInfoData.map((sideInfo, sideInfoIndex) => (
        <div key={sideInfoIndex}>
          <h3>{sideInfo.name}</h3>
          <p className='date'>
            [시행 {format(new Date(sideInfo.enforcement_date), 'yyyy.MM.dd.')}]
            [{sideInfo.type}
            &nbsp;
            {sideInfo.number}호,&nbsp;
            {format(new Date(sideInfo.promulgation_date), 'yyyy.MM.dd.')}
            ,&nbsp;
            {sideInfo.amendment_status}]
          </p>
        </div>
      ))}
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
)(SideInfo);
