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
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setisLoaded] = useState(false);
  const { RelatedLaw } = props;
  console.log(RelatedLaw);
  const handleClickSearch = (name, lawNum, enfDate) => {
    const { Law, Related, Result } = props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243/law/${encodeURIComponent(
          name,
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload,
      )
      .then((data) => {
        Related(data.data.Related);
        Law(data.data.Law);
        Result(data.data.Law.context);
        setisLoaded(true);
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(
            name.replace(/[^가-힣^0-9]/g, ''),
          )}?lawNum=${lawNum}&enfDate=${format(
            new Date(enfDate),
            'yyyy-MM-dd',
          )}`,
          '_blank',
          'width=1024,height=800,top=70,left=330',
        );
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
  };

  if (RelatedLaw.length === 0) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <link
        rel='stylesheet'
        href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
      />
      {RelatedLaw.map((sideInfo, sideInfoIndex) => (
        <div className='sideInfo-body' key={sideInfoIndex}>
          <h4
            className='sideInfo-title'
            onClick={() => handleClickSearch(
              sideInfo.name,
              sideInfo.number,
              sideInfo.enforcement_date,
            )}
          >
            {sideInfo.name}
          </h4>
          <p className='sideInfo-info'>
            [시행
            {' '}
            {format(new Date(sideInfo.enforcement_date), 'yyyy.MM.dd.')}
            ]
            <p>
              [
              {sideInfo.type}
              &nbsp;
              {sideInfo.number}
              호,&nbsp;
              {format(new Date(sideInfo.promulgation_date), 'yyyy.MM.dd.')}
              &nbsp;
              {sideInfo.amendment_status}
              ]
            </p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default connect(
  (state) => ({
    lawList: state.searchList.lawList,
    Law: state.Law.Law,
    RelatedLaw: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  }),
)(withRouter(SideInfo));
