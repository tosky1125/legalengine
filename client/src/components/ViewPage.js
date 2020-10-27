import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import ArticleLink from './ArtcleLink';
import './ViewPage.css';
import ConvertToPDF from './ConvertToPDF';
import queryString from 'query-string';

function ViewPage(props) {
  const [name] = useState(props.match.params.key);
  const { lawNum, enfDate } = queryString.parse(props.location.search);

  return (
    <div>
      <div className='viewpage-container'>
        <div className='viewpage-sideinfo-container'>
          <SideInfo />
        </div>
        <div className='viewpage-articlelink-container'>
          <ArticleLink />
        </div>
        <ConvertToPDF name={name} lawNum={lawNum} enfDate={enfDate} />
      </div>
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
)(withRouter(ViewPage));
