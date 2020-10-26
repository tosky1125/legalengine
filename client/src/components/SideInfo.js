import React, { useState } from 'react';
import './SideInfo.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';

function SideInfo(props) {
  let sideInfoData = JSON.parse(localStorage.related);
  console.log(sideInfoData);
  const [isLoaded, setisLoaded] = useState(false);

  const handleClickSearch = (refined_name, number, enforcement_date) => {
    const { lawinfo } = props;
    axios
      .get(
        `http://13.125.112.243/search?lawName=${encodeURIComponent(
          refined_name
        )}&lawNum=${number}&enfDate=${enforcement_date}`
      )
      .then((res) => {
        lawinfo(res.data);
        console.log(res.data);
        localStorage.Law = JSON.stringify(res.data.Law);
        setisLoaded(true);
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(
            refined_name
          )}&lawNum=${number}&enfDate=${format(
            new Date(enforcement_date),
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

  if (sideInfoData.length === 0) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }
  return (
    <div>
      {sideInfoData.map((sideInfo, sideInfoIndex) => (
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
            ,&nbsp;
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
    lawDetail: state.lawinfo.lawDetail,
  }),
  (dispatch) => ({
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(withRouter(SideInfo));
