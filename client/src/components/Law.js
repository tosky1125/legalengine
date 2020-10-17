import React from 'react';
import { connect } from 'react-redux';
import * as lawinfo from '../modules/lawinfo';
import * as date from '../modules/date';

function Law() {
  return <div></div>;
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
)(Law);
