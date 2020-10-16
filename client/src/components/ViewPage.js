import React from 'react';
import './ViewPage.css';
import { connect } from 'react-redux';
import * as lawinfo from '../modules/lawinfo';

function ViewPage(props) {
  return (
    <div>
      <div className='pickdate'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>시행령 규칙 </div>
        <div className='info-container'>
          <div className='lawtitle'> OO 법</div>
          <div className='chapter'>제 1절</div>
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
