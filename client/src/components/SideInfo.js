import React, { useState } from 'react';
import './SideInfo.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';

function SideInfo(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const { match } = props;
  const [name] = useState(match.params.key);
  // 연관법령 데이터
  const { RelatedLaw } = props;
  console.log(RelatedLaw);
  // 클릭시 syntax url에 맞는 쿼리문으로 포맷해 새창에서 열기
  // 기존 방식은 IE 에서 팝업창으로 인식하는 경우가 있어, 새탭이 아닌
  // 완전히 새로운 창에서 여는 방식을 채택. 하지만 고객 선호에 따라 수정해야할 수 있음.
  const handleClickSearch = (name, lawNum, enfDate) => {
    const { Law, Related, Result } = props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243/law/${encodeURIComponent(
          name,
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload,
      )
      .then((data) => {
        Related(data.data.Related);
        Law(data.data.Law);
        Result(data.data.Law.context);
        setisLoaded(true);
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(
            name.replace(/[^가-힣^0-9]/g, ''),
          )}?lawNum=${lawNum}&enfDate=${format(
            new Date(enfDate),
            'yyyy-MM-dd',
          )}`,
          '_blank',
          // 'width=1200, height=800, top=120, left=350, resizable=yes', // 팝업 확인 없이 새창
        );
      })
      .catch((err) => {
        if (err.res) {
          console.log(err.res.data);
          console.log(err.res.status);
          console.log(err.res.headers);
        } else if (err.req) {
          console.log(err.req);
        } else {
          console.log('Error', err.message);
        }
        console.log(err.config);
      });
  };
  // 서버에서 받아온 정보가 없을 경우 (서버와 연결 장애 혹은 데이터 없음)
  if (RelatedLaw.length === 0) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <link
        rel='stylesheet'
        href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
      />
      {RelatedLaw.map((sideInfo, sideInfoIndex) => (
        <div className={sideInfo.name.replace(/[^ㄱ-ㅎ가-힇0-9]/g, '') === name ? 'selected-info' : 'sideInfo-body'} key={sideInfoIndex}>
          <button
            className={sideInfo.name.replace(/[^ㄱ-ㅎ가-힇0-9]/g, '') === name ? 'selected-title' : 'sideInfo-title'}
            onClick={() => handleClickSearch(
              sideInfo.name,
              sideInfo.number,
              sideInfo.enforcement_date,
            )}
            type='button'
          >
            <h4>{sideInfo.name}</h4>
          </button>
          <p className='sideInfo-info'>
            [시행
            {' '}
            {format(new Date(sideInfo.enforcement_date), 'yyyy.MM.dd.')}
            ]
            <p>
              [
              {sideInfo.type}
              &nbsp;
              {sideInfo.number}
              호,&nbsp;
              {format(new Date(sideInfo.promulgation_date), 'yyyy.MM.dd.')}
              &nbsp;
              {sideInfo.amendment_status}
              ]
            </p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default connect(
  (state) => ({
    lawList: state.searchList.lawList,
    Law: state.Law.Law,
    RelatedLaw: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  }),
)(withRouter(SideInfo));
