import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MainInfo.css';

const Maininfo = (props) => {
  // Data from API
  const [result, setResult] = useState([]);
  const { name, lawNum, enfDate } = props;

  // http://13.125.112.243/law/119구조구급에관한법률?lawNum=222449&enfDate=2021-10-21
  // http://13.125.112.243/law/119구조구급에관한법률시행령?lawNum=220037&enfDate=2021-10-21

  // API Call
  useEffect(() => {
    axios.get(
      `http://13.125.112.243/law/${encodeURIComponent(
        name
      )}?lawNum=${lawNum}&enfDate=${enfDate}`
    ).then((data) => {
      setResult(data.data.Law.context);
      console.log(data.data.Law.context);
    });
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: result
      }}
    ></div>
  );
};

export default Maininfo;
