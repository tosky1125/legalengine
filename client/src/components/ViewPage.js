import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';
import SideInfo from '../components/SideInfo';
import ArticleLink from '../components/ArticleLink';
import './ViewPage.css';
import ConvertToPDF from '../components/ConvertToPDF';
import queryString from 'query-string';

function ViewPage(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const { Law, Related, Result } = props;
  const [name] = useState(props.match.params.key);
  const { lawNum, enfDate } = queryString.parse(props.location.search);

  useEffect(() => {
    const payload = { lawNum, enfDate };

    // setTimeout(() => {
    //   setisLoaded(true);
    // }, 500);

    let url = `http://13.125.112.243/law/${encodeURIComponent(
      name
    )}?lawNum=${lawNum}&enfDate=${enfDate}`;

    if (!lawNum) {
      url = `http://13.125.112.243/law/${name}?enfDate=${enfDate}`;
    }
    axios
      .post(url, payload)
      .then((data) => {
        Related(data.data.Related);
        Law(data.data.Law);
        Result(data.data.Law.context);
        console.log(data.data.Law);
        console.log(data.data.Related);
        // console.log(data.data.Law.context);
        setisLoaded(true);
      })
      .catch(function (err) {
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
  }, []);

  if (isLoaded === true) {
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
  } else {
    return <div>hi</div>;
  }
}

export default connect(
  (state) => ({
    Law: state.Law.Law,
    Related: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  })
)(withRouter(ViewPage));
