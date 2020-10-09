import React, { Component } from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { searchlist } from '../modules/searchlist';

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  //필요 states: 페이지당 표시할 Post 수, 전체 post 데이터, 현재 페이지

  render() {
    return (
      <>
        <div className='result'>
          <SearchBar />
          <div className='result-container'></div>
          <div>총 100개</div>
          <div>
            변호사법
            <div>
              <span>법률 | 2349032 호 | 타법개정 | 법무부</span>
              <span>공표일자:2020.10.01 시행일:2020.10.01</span>
            </div>
          </div>
          <div>1 2 3 4 5 </div>
        </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist(data)),
  })
)(SearchResult);
