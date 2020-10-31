import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  pageSize: PropTypes.number,
};
const defaultProps = {
  initialPage: 1,
  pageSize: 5,
};
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }
  componentDidMount() {
    // 데이터 배열이 있을 때, 페이지 셋업
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }
  componentDidUpdate(prevProps) {
    // 데이터 배열이 변하면 페이지도 리셋
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }
  setPage(page) {
    let { items, pageSize } = this.props;
    let pager = this.state.pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // specified page를 위한 페이저 객체
    pager = this.getPager(items.length, page, pageSize);
    // 데이터 배열에서 나온 데이터들을 위한 새로운 페이지 만들기
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager: pager });
    // 부모 컴포넌트에서 페이지바꾸기 함수 불러오기
    this.props.onChangePage(pageOfItems);
  }
  getPager(totalItems, currentPage, pageSize) {
    let defaultNum = 10;
    currentPage = currentPage || 1;
    pageSize = pageSize || defaultNum;
    // 전체 페이지 계산
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= defaultNum) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // 페이지 개수 10보다 많으면 개산하고 엔드 페이지
      if (currentPage <= 6) {
        startPage = 1;
        endPage = defaultNum;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // 데이터 인덱스 엔드
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // 페이지 배열 생성 -> 페이저에서 반복안되게
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    //페이저 프로퍼티 반환
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  render() {
    let pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      // 페이지가 1이면 페이저 디스플레이 안하기
      return null;
    }
    return (
      <div>
        <ul className='pagination'>
          <link
            rel='stylesheet'
            href='https://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
          />
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a href='#page' onClick={() => this.setPage(1)}>
              {'<<'}
            </a>
          </li>
          <li className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a href='#page' onClick={() => this.setPage(pager.currentPage - 1)}>
              {'<'}
            </a>
          </li>
          {pager.pages.map((page, index) => (
            <li
              key={index}
              className={pager.currentPage === page ? 'active' : ''}
            >
              <a href='#page' onClick={() => this.setPage(page)}>
                {page}
              </a>
            </li>
          ))}
          <li
            className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            <a href='#page' onClick={() => this.setPage(pager.currentPage + 1)}>
              {'>'}
            </a>
          </li>
          <li
            className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            <a href='#page' onClick={() => this.setPage(pager.totalPages)}>
              {'>>'}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
