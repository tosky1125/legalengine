import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-copyright text-center navbar navbar-fixed-bottom'>
        <Container fluid='md'>
          <Row>
            <Col md={1} />
            <Col md={2}>
              <span>주식회사 까리용</span>
            </Col>
            <Col md={6}>
              <span>
                &copy;
                {new Date().getFullYear()}
                Copyright Inc., All rights reserved.
              </span>
            </Col>
            <Col md={2}>
              <a
                href='https://legalengine.co.kr/termsofservice'
                className='footer-links-term'
              >
                이용약관
              </a>
              <a
                href='https://legalengine.co.kr/privacypolicy'
                className='footer-links-policy'
              >
                개인정보 처리방침
              </a>
            </Col>
            <Col md={1} />
          </Row>
        </Container>
      </div>
      <link
        rel='stylesheet'
        href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
      />
    </div>
  );
}

export default Footer;
