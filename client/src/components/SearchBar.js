import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SearchBar.css';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import * as searchword from '../modules/searchword';
import * as searchdate from '../modules/searchdate';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Col, Container, Row } from 'react-bootstrap';

function SearchBar(props) {
  const [searchWord, setSearchWord] = useState('');
  const [isLoaded, setisLoaded] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const today = format(new Date(), 'yyyy-MM-dd');
  const [searchDate, setSearchDate] = useState(today);
  // searchdate(searchDate)

  const handleChangeTerm = (e) => {
    setSearchWord(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = () => {
    const payload = { searchWord: searchWord, date: searchDate };
    const { searchlist, history, searchword, searchdate } = props;
    // localStorage.searchWord = JSON.stringify(searchWord);
    // localStorage.searchDate = JSON.stringify(searchDate);
    searchword(searchWord);
    searchdate(searchDate);

    axios
      .post('http://13.125.112.243/search', payload)
      .then((res) => {
        searchlist(res.data);
        setisLoaded(true);
        console.log(res.data);
      })
      .then(() => {
        history.push('/search');
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

  return (
    <div>
      <Container>
      <div className='searchbar-container'>
        <Col md={2} />
        <form
        className='searchbar-form'
        autoComplete='off'
        onSubmit={handleSubmit(handleSearch)}
        >
          <Col md={8}>
          <div className='searchbar-box'>
            <input
              type='text'
              name='setSearchWord'
              className='searchbar-box-word'
              ref={register({
              required: true,
              minLength: 2,
              pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|  0-9|*+$]/,
              })}
              placeholder='법령을 검색해보세요.'
              onChange={handleChangeTerm}
              />
            <input
              type='date'
              name='date'
              className='searchbar-box-calendar'
              value={searchDate}
              onChange={handleChangeDate}
            />
            <button className='searchbar-btn' type='submit'>
              검색
            </button>
            </div>
            <p className='valid-error'>
            {errors.setSearchWord && '문자와 숫자 2글자 이상 입력해주세요.'}
            </p>
          </Col>
          <Col md={2} />
        </form>
      </div>
      </Container>      
    </div>
  );
}

export default connect(
  (state) => ({
    seachlist: state.searchlist.seachlist,
    searchword: state.searchword.searchword,
    searchdate: state.searchdate.searchdate,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
    searchword: (data) => dispatch(searchword.searchword(data)),
    searchdate: (data) => dispatch(searchdate.seachdate(data)),
  })
)(withRouter(SearchBar));
