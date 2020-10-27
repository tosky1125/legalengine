import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './SearchBar.css';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setisLoaded] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const today = format(new Date(), 'yyyy-MM-dd');
  const [searchDate, setSearchDate] = useState(today);

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
    const { searchlist, history } = props;
    localStorage.searchWord = JSON.stringify(searchTerm);
    localStorage.searchDate = JSON.stringify(searchDate);
    axios
      .post('http://13.125.112.243/search', payload)
      .then((res) => {
        searchlist(res.data);
        setisLoaded(true);
        console.log(res.data);
        localStorage.list = JSON.stringify(res.data);
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
      <div className='searchbar-container'>
        <form className='searchbar-form' autocomplete='off' onSubmit={handleSubmit(handleSearch)}>
          <div className='searchbar-flex'>
            <label className='searchbar-Term'>
              <input
                type='text'
                name='setSearchTerm'
                ref={register({
                  required: true,
                  minLength: 2,
                  pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|  0-9|*+$]/,
                })}
                placeholder='법령을 검색해보세요.'
                onChange={handleChangeTerm}
              />
            </label>
            <label className='searchbar-date'>
              <input
                type='date'
                name='date'
                value={searchDate}
                onChange={handleChangeDate}
              />
            </label>
            <button className='searchbar-btn' type='submit'>
              검색
            </button>
          </div>
          <div className='valid-error'>
            {errors.setSearchTerm && '문자&숫자 2글자 이상 입력 가능합니다.'}
          </div>
        </form>
      </div>
    </div>
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
