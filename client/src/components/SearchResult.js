import React from 'react';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import * as searchlist from '../modules/searchlist';
import Pagination from './Pagination';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';
import './SearchResult.css';
import { format } from 'date-fns';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

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

  handleClickSearch = (name, lawNum, enfDate) => {
    const { Law, Related, Result, history } = this.props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243:80/law/${encodeURIComponent(
          name
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload
      )
      .then((res) => {
        console.log(res.data);
        Related(res.data.Related);
        Law(res.data.Law);
        Result(res.data.Law.context);
        // localStorage.Law = JSON.stringify(res.data.Law);
        // localStorage.related = JSON.stringify(res.data.Related);
        this.setState({
          isLoaded: true,
        });
      })
      .then(() => {
        window.open(
          `/law/${encodeURIComponent(
            name.replace(/[^가-힣^0-9]/g, '')
          )}?lawNum=${lawNum}&enfDate=${format(
            new Date(enfDate),
            'yyyy-MM-dd'
          )}`,
          '_blank'
        );
        // history.push(
        //   `/law/${encodeURIComponent(
        //     name.replace(/[^가-힣^0-9]/g, '')
        //   )}?lawNum=${lawNum}&enfDate=${format(
        //     new Date(enfDate),
        //     'yyyy-MM-dd'
        //   )}`
        // );
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
          <div className='searchresult-container'>
            <SearchBar />
            <h3 className='searchresult-empty'>
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어를 입력해주시기 바랍니다.</p>
            </h3>
          </div>
        </div>
      );
    }
    return (
      <div className='searchresult-container'>
        <SearchBar />
        <link
            rel='stylesheet'
            href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
        />
        <Row>
          <Col md-auto>
            <Card className='searchresult-form'>
              <Card.Header>
                <Card.Title as='h5'> 총 {this.props.lawlist.length} 건의 결과</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                <Table responsive hover>
                  <tbody>
                      {this.state.pageOfItems.map((item, index) => (
                      <tr
                        className='searchresult-section'
                        key={index}
                        onClick={() =>
                          this.handleClickSearch(
                            item.name,
                            item.number,
                            item.enforcement_date
                          )
                        }
                      >
                        <td>
                          <h4 className="mb-1">{item.name}</h4>
                          <p className="m-0">
                            <span className='searchresult-type'>{item.type}</span>
                            <span className='searchresult-number'>
                              {item.number}호
                            </span>
                            <span className='searchresult-admendment'>
                              {item.amendment_status}
                            </span>
                            <span className='searchresult-ministry'>
                              {item.ministry}
                            </span>
                            <span className="searchresult-promulgation">
                            시행일자 :{' '}{format(new Date(item.enforcement_date), 'yyyy.MM.dd')}
                          </span>
                          <span className="searchresult-enforcement">
                            공포일자 :{' '}{format(new Date(item.promulgation_date), 'yyyy.MM.dd')}&nbsp;
                          </span>
                          </p>
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </Table>
                <div className='text-center'>
                  <Pagination
                    items={this.props.lawlist}
                    onChangePage={this.onChangePage}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>  
    );
  }
}
/* 
<div className='searchresult-law-number'>
            총 {this.props.lawlist.length} 건의 결과
          </div>
          <div className='searchresult-page-list text-center'>
            {this.state.pageOfItems.map((item, index) => (
              <div
                to='/view'
                target='_blank'
                className='searchresult-page'
                key={index}
                onClick={() =>
                  this.handleClickSearch(
                    item.name,
                    item.number,
                    item.enforcement_date
                  )
                }
              >
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
                </span>
              </div>
            ))}
*/

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
    Law: state.Law.Law,
    Related: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  })
)(withRouter(SearchResult));
