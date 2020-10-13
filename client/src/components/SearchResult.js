import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import Pagination from './Pagination';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      pageOfItems: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // 데이터들의 새로운 페이지로 스테이트 업데이트
    this.setState({ pageOfItems: pageOfItems });
  }

  handleClickSearch = (number, enforcement_date) => {
    const payload = {
      number,
      enforcement_date,
    };
    const { lawinfo, history } = this.props;
    axios.post('http://13.125.112.243/search/post', payload).then((res) => {
      lawinfo(res.data);
      console.log(res.data);
      history.push('/view');
    });
  };

  render() {
    return (
      <div>
        <div className='container'>
          <SearchBar />
          <div>
            총{' '}
            {this.props.lawlist.length === 0 ? '0' : this.props.lawlist.length}{' '}
            개
          </div>
          <div className='text-center'>
            <h1>페이지네이션</h1>
            {this.state.pageOfItems.map((item) => (
              <>
                <a
                  href='/view'
                  key={item.id}
                  onClick={() =>
                    this.handleClickSearch(item.number, item.enforcement_date)
                  }
                >
                  <h3 className='name'>{item.name}</h3>
                  <span className='type'>{item.type}</span>
                  <span className='number'>{item.number}</span>
                  <span className='admendment'>{item.amendment_status}</span>
                  <span className='ministry'>{item.ministry}</span>
                  <span className='promulgation'>{item.promulgation_date}</span>
                  <span className='enforcement'>{item.enforcement_date}</span>
                </a>
              </>
            ))}
            <div>
              <Pagination
                items={this.props.lawlist}
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
    lawinfo: state.lawinfo.lawinfo,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(withRouter(SearchResult));
