import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SearchBar.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Col, Container } from 'react-bootstrap';
import * as searchList from '../modules/SearchList';
import * as searchWord from '../modules/SearchWord';

function SearchBar(props) {
  // 유저 입력값인 검색어와 날짜를 word, searchDate 스테이트로 받기
  const [word, setWord] = useState('');
  const [isLoaded, setisLoaded] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const today = format(new Date(), 'yyyy-MM-dd');
  const [searchDate, setSearchDate] = useState(today);
  // 값이 입력되면 스테이트값 변경
  const handleChangeTerm = (e) => {
    setWord(e.target.value);
  };
  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
  };
  // 검색 버튼 클릭시 값이 변경된 스테이트를 서버에 전달
  const handleSearch = () => {
    const payload = { keyword: word, date: searchDate };
    const { searchList, history, searchWord } = props;
    searchWord(word);

    axios
      .post('http://13.125.112.243/search', payload)
      .then((res) => {
        searchList(res.data);
        setisLoaded(true);
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
                <label>
                  <input
                    type='text'
                    name='setWord'
                    className='searchbar-box-word'
                    ref={register({
                      required: true,
                      minLength: 2,
                      pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|  0-9|*+$]/,
                    })}
                    placeholder='법령을 검색해보세요.'
                    onChange={handleChangeTerm}
                  />
                </label>
                <label>
                  <input
                    type='date'
                    name='date'
                    className='searchbar-box-calendar'
                    value={searchDate}
                    onChange={handleChangeDate}
                  />
                </label>
                <button className='searchbar-btn' type='submit'>
                  검색
                </button>
              </div>
              <p className='valid-error'>
                {errors.setWord && '문자와 숫자 2글자 이상 입력해주세요.'}
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
    seachlist: state.searchList.seachList,
    searchWord: state.searchWord.searchWord,
  }),
  (dispatch) => ({
    searchList: (data) => dispatch(searchList.searchList(data)),
    searchWord: (data) => dispatch(searchWord.searchWord(data)),
  }),
)(withRouter(SearchBar));
