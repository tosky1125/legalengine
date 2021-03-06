/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';
import SideInfo from '../components/SideInfo';
import ArticleLink from '../components/ArticleLink';
import ConvertToPDF from '../components/ConvertToPDF';
import './ViewPage.css';

function ViewPage(props) {
  const [isLoaded, setisLoaded] = useState(false);
  const { match } = props;
  const [name] = useState(match.params.key);

  // 검색어 하이라이트
  const changeStr = (str, keyword) => {
    const bracket = new Set(['<', '>']);
    let isOn = false;

    const { length } = keyword;

    for (let i = 0; i < str.length; i++) {
      const keyCheck = str.slice(i, i + length);

      if (bracket.has(str[i])) {
        isOn = !isOn;
      }
      if (!isOn && keyCheck === keyword) {
        const tmp1 = str.slice(0, i);
        const tmp2 = str.slice(i + length, str.length);
        str = `${tmp1}thishashkey${tmp2}`;
      }
    }

    str = str.replace(
      /thishashkey/g,
      `<span class='keyword-highlight'>${keyword}</span>`,
    );
    return str;
  };

  // 요청 받은 쿼리에 따라 서버에 Post 요청
  useEffect(() => {
    const { Law, Related, Result } = props;
    const { lawNum, enfDate, keyword } = queryString.parse(props.location.search);
    const payload = { lawNum, enfDate };
    console.log(keyword);
    console.log(lawNum, enfDate);

    let url = `http://13.125.112.243/law/${encodeURIComponent(
      name,
    )}?lawNum=${lawNum}&enfDate=${enfDate}`;
    if (!lawNum) {
      url = `http://13.125.112.243/law/${name}?enfDate=${enfDate}`;
    }

    axios
      .post(url, payload)
      .then((data) => {
        Related(data.data.Related);
        Law(data.data.Law);
        if (keyword) {
          Result(changeStr(data.data.Law.context, keyword));
        } else {
          Result(data.data.Law.context);
        }
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
  }
  return (
    <div>
      <div className='loder-container'>
        <p className='loader-message'>Loading...</p>
        <div className='loader' />
      </div>
    </div>
  );
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
  }),
)(withRouter(ViewPage));
