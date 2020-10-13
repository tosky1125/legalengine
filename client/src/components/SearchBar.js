import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import { withRouter } from 'react-router-dom';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleChangeTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeDate = (e) => {
    setSearchDate(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const payload = { searchWord: searchTerm, date: searchDate };
    const {
      searchlist,
      //  history
    } = props;

    axios
      .post('http://13.125.112.243/laws', payload)
      .then((res) => {
        searchlist(res.data);
        console.log(res.data);
        // history.push('/search');
      })
      .catch();
  };

  return (
    <>
      <div className='search-container'>
        <form className='search-form' onSubmit={handleSearchSubmit}>
          <div className='search-title'>
            <span className='law'>법령</span>
            <span className='date'>날짜</span>
          </div>
          <label className='search-Term'>
            <input
              type='text'
              name='text'
              placeholder='검색어를 입력하세요'
              value={searchTerm}
              onChange={handleChangeTerm}
            />
          </label>
          <label className='search-date'>
            <input
              type='date'
              name='date'
              placeholder='대상 날짜'
              value={searchDate}
              onChange={handleChangeDate}
            />
          </label>
          <span className='search-btn'>
            <button type='submit'>검색</button>
          </span>
        </form>
      </div>
    </>
  );
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
  })
)(withRouter(SearchBar));
