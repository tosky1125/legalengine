import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import Pagination from './Pagination';
// import Pagination2 from './2Pagination2';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as lawinfo from '../modules/lawinfo';
import './SearchResult.css';
import { format } from 'date-fns';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      isLoaded: false,
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // 데이터들의 새로운 페이지로 스테이트 업데이트
    this.setState({ pageOfItems: pageOfItems });
  }

  handleClickSearch = (name, number, enforcement_date) => {
    const { lawinfo, history } = this.props;
    axios
      .get(`http://13.125.112.243/search?lawName=${name}&lawNum=${number}&enfDate=${enforcement_date}`)
      .then((res) => {
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
    if (this.props.lawlist.length === 0) {
      return (
        <div>
          <SearchBar />
          <div className='searchresult-empty'>검색 결과가 없습니다.</div>
        </div>
      );
    }
    return (
      <div>
<<<<<<< HEAD
        <div className='container'>
          <SearchBar />
          <div className='law-number'>총 {this.props.lawlist.length} 개</div>
          <div className='page-list text-center'>
            {this.state.pageOfItems.map((item, index) => (
              <div
                className='page'
=======
        <div className='searchresult-container'>
          <SearchBar />
          <div className='searchresult-law-number'>
            총 {this.props.lawlist.length} 건의 결과
          </div>
          <div className='searchresult-page-list text-center'>
            {this.state.pageOfItems.map((item, index) => (
              <div
                to='/view'
                target='_blank'
                className='searchresult-page'
>>>>>>> b6160c374b429d2a9ab30902ad5aa08885241fc5
                key={index}
                onClick={() =>
                  this.handleClickSearch(item.name, item.number, item.enforcement_date)
                }
              >
<<<<<<< HEAD
                <h3 className='name'>{item.name}</h3>
                <span className='type'>{item.type}&nbsp;</span>
                <span className='number'>{item.number}호&nbsp;</span>
                <span className='admendment'>
                  {item.amendment_status}&nbsp;
                </span>
                <span className='ministry'>{item.ministry}&nbsp;</span>
                <span className='promulgation'>
                  공포일:{' '}
                  {format(new Date(item.promulgation_date), 'yyyy-MM-dd')}&nbsp;
                </span>
                <span className='enforcement'>
                  시행일:{' '}
                  {format(new Date(item.enforcement_date), 'yyyy-MM-dd')}
=======
                <h3 className='searchresult-name'>{item.name}</h3>

                <span className='searchresult-type'>{item.type}&nbsp;</span>
                <span className='searchresult-number'>
                  {item.number}호&nbsp;
                </span>
                <span className='searchresult-admendment'>
                  {item.amendment_status}&nbsp;
                </span>
                <span className='searchresult-ministry'>
                  {item.ministry}&nbsp;
                </span>
                <span className='searchresult-promulgation'>
                  공포일자 :{' '}
                  {format(new Date(item.promulgation_date), 'yyyy.MM.dd')}&nbsp;
                </span>
                <span className='searchresult-enforcement'>
                  시행일자 :{' '}
                  {format(new Date(item.enforcement_date), 'yyyy.MM.dd')}
>>>>>>> b6160c374b429d2a9ab30902ad5aa08885241fc5
                </span>
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
<<<<<<< HEAD
        <hr />
        <div className='credits text-center'>
          <p>
            <a href='/'>주식회사 까리용</a>
          </p>
          <p>© 2019 Carillon Inc., All rights reserved.</p>
        </div>
=======
>>>>>>> b6160c374b429d2a9ab30902ad5aa08885241fc5
      </div>
    );
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
