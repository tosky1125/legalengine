import React, { useState, useEffect, useRef } from 'react';
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

function Pagination2(props) {
  const [pager, setPager] = useState({ pager: {} });

  // 3번째 시도
  const { items, initialPage } = props;
  let prevItems = useRef(items).current;
  useEffect(() => {
    if (items !== prevItems) setPage(initialPage);
    return () => {
      prevItems = items;
    };
  }, [items]);
  console.log(prevItems);
  console.log(items);
  //2번째 시도
  /*useEffect(() => {
    if (!props.items && !props.items.length) return;
    setPage(props.initialPage);
  }, [props.items]);*/
  // 1번째 시도
  /*useEffect(() => {
    // 데이터 배열이 있을 때, 페이지 셋업
    if (props.items && props.items.length) {
      setPage(props.initialPage);
    }
  }, []);
  console.log(props.items);
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevItems = usePrevious(props.items);
  useEffect(() => {
    // 데이터 배열이 변하면 페이지도 리셋
    if (props.items !== prevItems) {
      setPage(props.initialPage);
    }
    console.log(prevItems);
  }, []);
  console.log(props.items);*/

  //props.items !== prevItems
  //JSON.stringify(props.items) !== JSON.stringify(prevItems)

  const setPage = (page) => {
    let { items, pageSize } = props;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // specified page를 위한 페이저 객체
    let newPager = getPager(items.length, page, pageSize);
    // 데이터 배열에서 나온 데이터들을 위한 새로운 페이지 만들기
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    setPager({ pager: newPager });
    // 부모 컴포넌트에서 페이지바꾸기 함수 불러오기
    props.onChangePage(pageOfItems);
  };
  const getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    // 전체 페이지 계산
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // 페이지 개수 10보다 많으면 개산하고 엔드 페이지
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
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
  };
  console.log(pager);
  if (!pager.pages || pager.pages.length <= 1) {
    // 페이지가 1이면 페이저 디스플레이 안하기
    return null;
  }
  return (
    <>
      <ul className='pagination'>
        <span className='pager-first'>
          <span className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a href='#page' onClick={() => setPage(1)}>
              {'<<'}
            </a>
          </span>
        </span>
        <span className='pager-previous'>
          <span className={pager.currentPage === 1 ? 'disabled' : ''}>
            <a href='#page' onClick={() => setPage(pager.currentPage - 1)}>
              {'<'}
            </a>
          </span>
        </span>
        {pager.pages.map((page, index) => (
          <span className='pager-numbers'>
            <span
              key={index}
              className={pager.currentPage === page ? 'active' : ''}
            >
              <a href='#page' onClick={() => setPage(page)}>
                {page}
              </a>
            </span>
          </span>
        ))}
        <span className='pager-next'>
          <span
            className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            <a href='#page' onClick={() => setPage(pager.currentPage + 1)}>
              {'>'}
            </a>
          </span>
        </span>
        <span className='pager-end'>
          <span
            className={pager.currentPage === pager.totalPages ? 'disabled' : ''}
          >
            <a href='#page' onClick={() => setPage(pager.totalPages)}>
              {'>>'}
            </a>
          </span>
        </span>
      </ul>
    </>
  );
}

Pagination2.propTypes = propTypes;
Pagination2.defaultProps = defaultProps;

export default Pagination2;
