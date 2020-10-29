import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainInfo.css';

const MainInfo = (props) => {
  // Data from API
  const [result, setResult] = useState([]);
  const { name, lawNum, enfDate } = props;
  const keyword = JSON.parse(localStorage.searchWord);

  // const changeStr = (str, keyword) => {
  //   const bracket = new Set(['<', '>']);
  //   let isOn = false;
  //   const { length } = keyword;
  //   for (let i = 0; i < str.length; i++) {
  //     const keyCheck = str.slice(i, i + length);
  //     if (bracket.has(str[i])) {
  //       isOn = !isOn;
  //     }
  //     if (!isOn && keyCheck === keyword) {
  //       const tmp1 = str.slice(0, i);
  //       const tmp2 = str.slice(i + length, str.length);
  //       str = `${tmp1}thishashkey${tmp2}`;
  //     }
  //   }
  //   str = str.replace(
  //     /thishashkey/g,
  //     `<span class='keyword-highlight'>${keyword}</span>`
  //   );
  //   return str;
  // };

  // http://13.125.112.243/law/119구조구급에관한법률?lawNum=222449&enfDate=2021-10-21
  // http://13.125.112.243/law/119구조구급에관한법률시행령?lawNum=220037&enfDate=2021-10-21

  // API Call
  useEffect(() => {
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
        setResult(data.data.Law.context);
        // console.log(data.data.Law.context);
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

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: result,
      }}
    ></div>
  );
};
export default MainInfo;
