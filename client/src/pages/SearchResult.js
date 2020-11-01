import React from 'react';
import './SearchResult.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Row, Col, Card, Table,
} from 'react-bootstrap';
import * as searchList from '../modules/SearchList';
import * as searchWord from '../modules/SearchWord';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  // 데이터들의 새로운 페이지로 스테이트 업데이트
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  // 검색 결과를 클릭하면 새로운 창을 띄우고 쿼리 요청
  handleClickSearch = (name, lawNum, enfDate) => {
    const { searchTerm } = this.props;

    window.open(
      `/law/${encodeURIComponent(
        name.replace(/[^가-힣^0-9]/g, ''),
      )}?lawNum=${lawNum}&enfDate=${format(
        new Date(enfDate),
        'yyyy-MM-dd',
      )}&searchWord=${searchTerm}`,
      '_blank',
      // 'width=1200, height=800, top=100, left=300, resizable=yes', // 팝업 확인 없이 새창
    );
  };

  render() {
    const { lawList } = this.props;
    const { pageOfItems } = this.state;
    if (lawList.length === 0) {
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
          <Col md={1} />
          <Col md={10}>
            <Card className='searchresult-form'>
              <Card.Header>
                <Card.Title as='h5'>
                  총&nbsp;
                  {lawList.length}
                  건의 결과
                </Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
                <Table responsive hover>
                  <tbody>
                    {pageOfItems.map((item, itemIndex) => (
                      <tr
                        key={itemIndex}
                        className='searchresult-section'
                        onClick={() => this.handleClickSearch(
                          item.name,
                          item.number,
                          item.enforcement_date,
                        )}
                      >
                        <td>
                          <h4 className='mb-3'>{item.name}</h4>
                          <p className='m-0'>
                            <span className='searchresult-type'>
                              {item.type}
                            </span>
                            <span className='searchresult-number'>
                              {item.number}
                              호
                            </span>
                            <span className='searchresult-admendment'>
                              {item.amendment_status}
                            </span>
                            <span className='searchresult-ministry'>
                              {item.ministry}
                            </span>
                            <span className='searchresult-promulgation'>
                              시행일자 :&nbsp;
                              {format(
                                new Date(item.enforcement_date),
                                'yyyy.MM.dd',
                              )}
                            </span>
                            <span className='searchresult-enforcement'>
                              공포일자 :&nbsp;
                              {format(
                                new Date(item.promulgation_date),
                                'yyyy.MM.dd',
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
                    items={lawList}
                    onChangePage={this.onChangePage}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={1} />
        </Row>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    lawList: state.searchList.lawList,
    searchTerm: state.searchWord.searchWord,
  }),
  (dispatch) => ({
    searchList: (data) => dispatch(searchList.searchList(data)),
    searchWord: (data) => dispatch(searchWord.searchWord(data)),
  }),
)(withRouter(SearchResult));
