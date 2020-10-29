import React, { useState } from 'react';
import './SideInfo.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';

function SideInfo(props) {
  // let sideInfoData = JSON.parse(localStorage.related);
  // console.log(sideInfoData);
  const [isLoaded, setisLoaded] = useState(false);

  const { Related1 } = props;
  console.log(Related1);

  const handleClickSearch = (name, lawNum, enfDate) => {
    const { Law } = props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243/law/${encodeURIComponent(
          name
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload
      )
      .then((res) => {
        Law(res.data);
        // console.log(res.data);
        // localStorage.Law = JSON.stringify(res.data.Law);
        setisLoaded(true);
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(name)}?lawNum=${lawNum}&enfDate=${format(
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
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
  })
)(withRouter(SideInfo));
