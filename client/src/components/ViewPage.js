import React from 'react';
import './ViewPage.css';

export default function ViewPage() {
  return (
    <div>
      <div className='pickdate'>2020/10/7 적용</div>
      <div className='view-container'>
        <div className='sideinfo-container'>시행령 규칙</div>
        <div className='info-container'>
          <div className='lawtitle'>가사소송법</div>
          <div className='chapter'>제 1편 총칙</div>
        </div>
      </div>
    </div>
  );
}
