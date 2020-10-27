import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-form'>
      <span className="footer-name">주식회사 까리용</span>
      <span className="footer-rights">© 2020 Carillon Inc., All rights reserved.</span>
      <span className="footer-guideline">
        <a className="footer-guideline-term" href="https://legalengine.co.kr/termsofservice">이용약관</a>
        <a className="footer-guideline-policy" href="https://legalengine.co.kr/privacypolicy">개인정보 이용방침</a>
      </span>
    </div>
  );
}

export default Footer;
