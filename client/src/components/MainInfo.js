import React from 'react';
import { connect } from 'react-redux';
import * as Result from '../modules/Result';
import './MainInfo.css';

const MainInfo = (props) => {
  const { LawText } = props;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: LawText,
      }}
    ></div>
  );
};

export default connect(
  (state) => ({
    LawText: state.Result.Result,
  }),
  (dispatch) => ({
    Result: (data) => dispatch(Result.Result(data)),
  })
)(MainInfo);
