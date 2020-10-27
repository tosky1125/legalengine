import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import SideInfo from './SideInfo';
import ArticleLink from './ArtcleLink';
import './ViewPage.css';
import ConvertToPDF from './ConvertToPDF';

function ViewPage(props) {
  const [name] = useState(props.match.params.key);
  const [lawNum] = useState(
    decodeURIComponent(props.location.search.slice(8, 14))
  );
  const [enfDate] = useState(
    decodeURIComponent(props.location.search.slice(23))
  );

  return (
    <div>
      <div className='viewpage-container'>
        <div className='viewpage-sideinfo-container'>
          <SideInfo />
        </div>
        <div className='viewpage-articlelink-container'>
          {/* <ArticleLink /> */}
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
