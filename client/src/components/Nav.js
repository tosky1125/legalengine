import React from 'react';
import logo from '../images/logo.svg';
import './Nav.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

function NavBar() {
  return (
    <div className='nav-form container-fluid'>
      <Row>
        <Col md={8} xl={12}>
          <Link to='/'>
            <img className='nav-logo' src={logo} alt='logo'></img>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default NavBar;
