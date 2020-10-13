import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import Pagination from './Pagination';

class SearchR extends React.Component {
  constructor() {
    super();

    // 임의 데이터 생성 (서버에 디비 작업 아직 안됨)
    let exampleItems = [...Array(150).keys()].map((i) => ({
      id: i + 1,
      name: '변호사법 ' + (i + 1),
    }));

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        <link
          rel='stylesheet'
          href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
        />
        <div className='container'>
          <div className='searchbar'>
            <SearchBar />
          </div>
          <div className='text-center'>
            <h1>페이지네이션</h1>
            {this.state.pageOfItems.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
            <div>
              <Pagination
                items={this.state.exampleItems}
                onChangePage={this.onChangePage}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className='credits text-center'>
          <p>
            <a href='/'>주식회사 까리용</a>
          </p>
          <p>© 2019 Carillon Inc., All rights reserved.</p>
        </div>
      </div>
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
)(SearchR);
