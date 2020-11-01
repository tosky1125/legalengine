import React from 'react';
import './Pagination.css';

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
    const { items, initialPage } = this.props;
    if (items && items.length) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    // 데이터 배열이 변하면 페이지도 리셋
    const { items, initialPage } = this.props;
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  getPager(totalItems, currentPage, pageSize) {
    const defaultNum = 10;
    currentPage = currentPage || 1;
    pageSize = pageSize || defaultNum;
    // 전체 페이지 계산
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage; let
      endPage;
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
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // 페이지 배열 생성 -> 페이저에서 반복안되게
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i,
    );
    // 페이저 프로퍼티 반환
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  }

  setPage(page) {
    const { items, pageSize, onChangePage } = this.props;
    let { pager } = this.state;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // specified page를 위한 페이저 객체
    pager = this.getPager(items.length, page, pageSize);
    // 데이터 배열에서 나온 데이터들을 위한 새로운 페이지 만들기
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager });
    // 부모 컴포넌트에서 페이지바꾸기 함수 불러오기
    onChangePage(pageOfItems);
  }

  render() {
    const { pager } = this.state;
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

Pagination.defaultProps = defaultProps;
export default Pagination;
