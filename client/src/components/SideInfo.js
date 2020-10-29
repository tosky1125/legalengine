import React, { useState } from 'react';
import './SideInfo.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';

function SideInfo(props) {
  // let sideInfoData = JSON.parse(localStorage.related);
  // console.log(sideInfoData);
  const [isLoaded, setisLoaded] = useState(false);

  const { Related1 } = props;
  console.log(Related1);

  const handleClickSearch = (name, lawNum, enfDate) => {
    const { Law, Related, Result } = props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243/law/${encodeURIComponent(
          name
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload
      )
      .then((data) => {
        Related(data.data.Related);
        Law(data.data.Law);
        Result(data.data.Law.context);
        // console.log(data.data);
        // localStorage.Law = JSON.stringify(res.data.Law);
        setisLoaded(true);
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(
            name.replace(/[^가-힣^0-9]/g, '')
          )}?lawNum=${lawNum}&enfDate=${format(
            new Date(enfDate),
            'yyyy-MM-dd'
          )}`,
          '_blank'
        );
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
  };

  if (Related1.length === 0) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      {Related1.map((sideInfo, sideInfoIndex) => (
        <div className='sideInfo-body' key={sideInfoIndex}>
          <h3
            className='sideInfo-title'
            onClick={() =>
              handleClickSearch(
                sideInfo.name,
                sideInfo.number,
                sideInfo.enforcement_date
              )
            }
          >
            {sideInfo.name}
          </h3>
          <p className='sideInfo-info'>
            [시행 {format(new Date(sideInfo.enforcement_date), 'yyyy.MM.dd.')}]
            [{sideInfo.type}
            &nbsp;
            {sideInfo.number}호,&nbsp;
            {format(new Date(sideInfo.promulgation_date), 'yyyy.MM.dd.')}
            &nbsp;
            {sideInfo.amendment_status}]
          </p>
        </div>
      ))}
    </div>
  );
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
    Law: state.Law.Law,
    Related1: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  })
)(withRouter(SideInfo));
