import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import * as searchlist from "../modules/searchlist";
import ReactPaginate from "react-paginate";
import axios from "axios";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //필요 states: 페이지당 표시할 Post 수, 전체 post 데이터, 현재 페이지

  //1.받아온 정보 정렬해 뿌려주기 각자
  //2.페이지네이션

  renderSearchResults = () => {
    const totalResult = this.props.lawlist;
    if (Object.keys(totalResult).length && totalResult.length) {
      return (
        <div className="totalResult-container">
          {totalResult.map((result) => {
            return (
              <>
                <a
                  key={result.id}
                  onClick={() =>
                    this.handleClickSearch(
                      result.number,
                      result.enforcement_date
                    )
                  }
                >
                  <h3 className="name">{result.name}</h3>
                  <span className="type">{result.type}</span>
                  <span className="number">{result.number}</span>
                  <span className="admendment">{result.amendment_status}</span>
                  <span className="ministry">{result.ministry}</span>
                  <span className="promulgation">
                    {result.promulgation_date}
                  </span>
                  <span className="enforcement">{result.enforcement_date}</span>
                </a>
              </>
            );
          })}
        </div>
      );
    }
  };

  handleClickSearch = (number, enforcement_date) => {
    const payload = {
      number,
      enforcement_date,
    };
    axios.post("http://13.125.112.243/search/post", payload).then((res) => {
      console.log(res.data);
    });
  };

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });
  };

  render() {
    return (
      <>
        <div className="result">
          <SearchBar />
          <div className="result-container"></div>
          <div>
            총{" "}
            {this.props.lawlist.length === 0
              ? "100"
              : this.props.lawlist.length}{" "}
            개
          </div>
          <div> {this.renderSearchResults()}</div>
          <div>
            <ReactPaginate
              previousLabel={"previous"} // previousLabel - 이전페이지로 가는 버튼의 value값
              nextLabel={"next"} // nextLabel - 다음페이지로 가는 버튼의 value값
              breakLabel={"..."} // breakLabel - 페이지 수가 많을 경우 건너뛸 수 있는 버튼
              breakClassName={"break-me"} // li 태그 class 이름
              pageCount={this.props.lawlist.length} // pageCount - 총 게시글의 개수(총 row 수)
              marginPagesDisplayed={2} // 여백 표시 페이지 수
              pageRangeDisplayed={8} // pageRangeDisplayed - 한 페이지에 표시할 게시글의 수
              onPageChange={this.handlePageClick} // onPageChange - 페이지 버튼을 눌렀을 때 일어나는 이벤트 이를 이용해 페이지 증감
              containerClassName={"pagination"} // containerClassName - css적용할 때 사용
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} // activeClassName - 현재 페이지에 css처리해주기 위한 클래스명을 적으면 됨
            />
          </div>
        </div>
      </>
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
)(SearchResult);
