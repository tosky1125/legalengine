import React from 'react';
import { connect } from 'react-redux';
import * as lawinfo from '../modules/lawinfo';

function Law() {
  return <div></div>;
}

export default connect(
  (state) => ({
    lawDetail: state.lawinfo.lawDetail,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(Law);
