import React, { Component } from 'react';
import axios from 'axios';
import './SearchBar.css';
import searchlist from '../modules/searchlist';
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      date: '',
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeWord = this.handleChangeWord.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  // 검색창1: 법령 input placeholder가 '검색어를 입력하세요'
  // 검색창2: 날짜 달력아이콘 클릭하면 달력 모달 생성, 날짜 선택 하면 input 창에 날짜 입력됨 placeholder가 '대상 날짜'
  // 검색버튼: 클릭하면 검색어와 날짜 post

  handleChangeWord = () => (e) => {
    this.setState({ searchWord: e.target.value });
    console.log(e.target.value);
  };

  handleChangeDate = () => (e) => {
    this.setState({ date: e.target.value });
    console.log(e.target.value);
  };

  handleSearchSubmit(e) {
    e.preventDefault();
    // const { searchWord, date } = this.state;
    // const payload = { searchWord, date };
    const payload = {
      searchWord: this.state.searchWord,
      date: this.state.date,
    };
    const { searchlist } = this.props;

    axios
      .post('http://13.125.112.243/laws', payload)
      .then((res) => {
        console.log(res.data);
        searchlist(res.data);
      })
      .catch();
  }

  render() {
    const { searchWord, date } = this.state;
    return (
      <>
        <div className='searchbar'>
          <div className='search-container'>
            <form className='search-form' onSubmit={this.handleSearchSubmit}>
              <div className='search-title'>
                <span className='law'>법령</span>
                <span className='date'>날짜</span>
              </div>
              <span className='search-word'>
                <input
                  type='text'
                  name='text'
                  placeholder='검색어를 입력하세요'
                  value={searchWord}
                  onChange={this.handleChangeWord('text')}
                />
              </span>
              <span className='search-date'>
                <input
                  type='date'
                  name='date'
                  placeholder='대상 날짜'
                  value={date}
                  onChange={this.handleChangeDate('date')}
                />
              </span>
              <span className='search-btn'>
                <button type='submit'>검색</button>
              </span>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SearchBar;
