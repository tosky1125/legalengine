import React from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import * as searchlist from '../modules/searchlist';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import * as Result from '../modules/Result';
import * as searchword from '../modules/searchword';
import './SearchResult.css';
import { Row, Col, Card, Table } from 'react-bootstrap';

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
    const { searchTerm } = this.props;
    const payload = { lawNum, enfDate };
    axios
      .post(
        `http://13.125.112.243:80/law/${encodeURIComponent(
          name
        )}?lawNum=${lawNum}&enfDate=${enfDate}`,
        payload
      )
      .then((res) => {
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
          )}&searchword=${searchTerm}`,
          '_blank'
        );
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
            <div className='searchresult-empty'>
              <h3>
                <p>검색 결과가 없습니다.</p>
                <p>다른 검색어를 입력해주시기 바랍니다.</p>
              </h3>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='searchresult-container'>
        <SearchBar />
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Card className='searchresult-form'>
              <Card.Header>
                <Card.Title as='h5'>
                  총 {this.props.lawlist.length}건의 결과
                </Card.Title>
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
                          <h4 className='mb-3'>{item.name}</h4>
                          <p className='m-0'>
                            <span className='searchresult-type'>
                              {item.type}
                            </span>
                            <span className='searchresult-number'>
                              {item.number}호
                            </span>
                            <span className='searchresult-admendment'>
                              {item.amendment_status}
                            </span>
                            <span className='searchresult-ministry'>
                              {item.ministry}
                            </span>
                            <span className='searchresult-promulgation'>
                              시행일자 :
                              {format(
                                new Date(item.enforcement_date),
                                'yyyy.MM.dd'
                              )}
                            </span>
                            <span className='searchresult-enforcement'>
                              공포일자 :
                              {format(
                                new Date(item.promulgation_date),
                                'yyyy.MM.dd'
                              )}
                              &nbsp;
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
          <Col md={1}></Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
    searchTerm: state.searchword.searchword,
    Law: state.Law.Law,
    Related: state.Related.Related,
    Result: state.Result.Result,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
    searchword: (data) => dispatch(searchword.searchword(data)),
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
    Result: (data) => dispatch(Result.Result(data)),
  })
)(withRouter(SearchResult));
