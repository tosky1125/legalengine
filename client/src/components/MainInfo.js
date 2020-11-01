import React from 'react';
import { connect } from 'react-redux';
import * as Result from '../modules/Result';
import './MainInfo.css';

const MainInfo = (props) => {
  const { LawText } = props;
  // 서버에서 받아온, 문자열로 출력되는 Html을 랜더링하기 위해 dangerouslySetInnerHTML 사용
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: LawText,
      }}
    />
  );
};

export default connect(
  (state) => ({
    LawText: state.Result.Result,
  }),
  (dispatch) => ({
    Result: (data) => dispatch(Result.Result(data)),
  }),
)(MainInfo);
