import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';
import SideInfo from './SideInfo';
import ArticleLink from './ArticleLink';
import './ViewPage.css';
import ConvertToPDF from '../components/ConvertToPDF';
import queryString from 'query-string';

function ViewPage(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const [name] = useState(props.match.params.key);
  
  const changeStr = (str, searchword) => {
    const bracket = new Set(['<', '>']);
    let isOn = false;
    const { length } = searchword;
    
    for (let i = 0; i < str.length; i++) {
      const keyCheck = str.slice(i, i + length);
      if (bracket.has(str[i])) {
        isOn = !isOn;
      }
      if (!isOn && keyCheck === searchword) {
        const tmp1 = str.slice(0, i);
        const tmp2 = str.slice(i + length, str.length);
        str = `${tmp1}thishashkey${tmp2}`;
      }
    }
    str = str.replace(
      /thishashkey/g,
      `<span class='searchword-highlight'>${searchword}</span>`
    );
    return str;
  };

  useEffect(() => {
    const { Law, Related, Result } = props;
    const { lawNum, enfDate, searchword } = queryString.parse(
      props.location.search
    );
    const payload = { lawNum, enfDate };
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
        Result(changeStr(data.data.Law.context, searchword));
        setisLoaded(true);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  if (isLoaded === true) {
    return (
      <div className='viewpage-container'>
        <div className='viewpage-sideinfo-container'>
          <SideInfo />
        </div>
        <div className='viewpage-articlelink-container'>
          <ArticleLink />
        </div>
        <ConvertToPDF />
      </div>
    );
  } else {
    return (
      <div>
        <div className='loder-container'>
          <p className='loader-message'>Loading...</p>
          <div className='loader'></div>
        </div>
      </div>
    );
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
