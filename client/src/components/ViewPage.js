import React from 'react';
import './ViewPage.css';
import { connect } from 'react-redux';
import * as lawinfo from '../modules/lawinfo';

function ViewPage(props) {
  return (
    <div>
      <div className='pickdate'></div>
      <div className='view-container'>
        <div className='sideinfo-container'></div>
        <div className='info-container'>
          <div className='lawtitle'> </div>
          <div className='chapter'></div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    laws: state.lawinfo.lawinfo,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(ViewPage);
