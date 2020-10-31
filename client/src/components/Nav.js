import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import logo from '../images/logo.svg';

function NavBar() {
  return (
    <div className='nav-form container-fluid navbar-fixed-top'>
      <Row>
        <Col md={8} xl={12}>
          <Link to='/'>
            <img className='nav-logo' src={logo} alt='logo' />
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default NavBar;
