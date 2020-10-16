import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import Pagination from './Pagination';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import './SearchResult.css';

class SearchResult extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      pageOfItems: [],
      isLoaded: false,
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
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
    const { lawinfo } = this.props;
    axios
      .get('http://13.125.112.243/search/laws/73554/20060401', payload)
      .then((res) => {
        this.setState({
          isloaded: true,
        });
        lawinfo(res.data);
        console.log(res.data);
        this.setState({
          isLoaded: true,
        });

        history.push('/view');
      })
      .catch(function (err) {
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

  render() {
    const { history } = this.props;
    if (!this.state.isloaded) {
      return (
        <div>
          <div className='container'>
            <SearchBar />
            <div>
              총{' '}
              {this.props.lawlist.length === 0
                ? '0'
                : this.props.lawlist.length}{' '}
              개
            </div>
            <div className='text-center'>
              <h1>페이지네이션</h1>
              {this.state.pageOfItems.map((item) => (
                <div className='page-list'>
                  <div
                    className='page'
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
                    <span className='promulgation'>
                      {item.promulgation_date}
                    </span>
                    <span className='enforcement'>{item.enforcement_date}</span>
                  </div>
                </div>
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
    } else {
      return (
        <>
          <div className='loading'>잠시 기다려주세요.</div>
          {history.push('/view')}
        </>
      );
    }
  }
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
    lawlistdetail: state.lawinfo.lawlistdetail,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
    lawinfo: (data) => dispatch(lawinfo.lawinfo(data)),
  })
)(withRouter(SearchResult));
