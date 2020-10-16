import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SearchBar.css';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import { withRouter } from 'react-router-dom';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [isLoaded, setisLoaded] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const { history } = props;

  const handleChangeTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = () => {
    const payload = { searchWord: searchTerm, date: searchDate };
    const { searchlist } = props;

    axios
      .post('http://13.125.112.243/search/laws', payload)
      .then((res) => {
        searchlist(res.data);
        console.log(res.data);
        setisLoaded(true);
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

  if (!isLoaded) {
    return (
      <>
        <div className='search-container'>
          <form className='search-form' onSubmit={handleSubmit(handleSearch)}>
            <div className='search-title'>
              <span className='law'>법령</span>
              <span className='date'>날짜</span>
            </div>
            <label className='search-Term'>
              <input
                type='text'
                name='setSearchTerm'
                ref={register({
                  required: true,
                  minLength: 2,
                  pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|*+$]/,
                })}
                placeholder='검색어를 입력하세요'
                onChange={handleChangeTerm}
              />
            </label>
            <label className='search-date'>
              <input
                type='date'
                name='date'
                placeholder='대상 날짜'
                onChange={handleChangeDate}
              />
            </label>
            <span className='search-btn'>
              <button type='submit'>검색</button>
            </span>
            <div className='valid-error'>
              {errors.setSearchTerm && '문자&숫자 2글자 이상 입력 가능합니다.'}
            </div>
            {console.log(searchTerm)}
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='loading'>잠시 기다려주세요.</div>
        {history.push('/search')}
      </>
    );
  }
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
  })
)(withRouter(SearchBar));
