import React from 'react';
import './SideInfo.css';
import { format } from 'date-fns';

function SideInfo() {
  let sideInfoData = JSON.parse(localStorage.lawdata2).Related;
  console.log(sideInfoData);

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
          <h3>{sideInfo.name}</h3>
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

export default SideInfo;
