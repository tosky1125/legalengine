import React, { Component } from "react";
import axios from "axios";
import "./SearchBar.css";
import * as searchlist from "../modules/searchlist";
import { connect } from "react-redux";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      date: "",
      message: "",
    };
    this.cancel = "";
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeWord = this.handleChangeWord.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  // 검색창1: 법령 input placeholder가 '검색어를 입력하세요'
  // 검색창2: 날짜 달력아이콘 클릭하면 달력 모달 생성, 날짜 선택 하면 input 창에 날짜 입력됨 placeholder가 '대상 날짜'
  // 검색버튼: 클릭하면 검색어와 날짜 post

  /* 이전 query(searchword) 요청을 취소하고 마지막 query만 요청해 퍼포먼스에 이득
    fetchSearchResults = (updatedPageNo = "", searchword) => {
    const pageNumber = updatedPageNo ? `$page=${updatedPageNo}` : "";
    const searchUrl = `localhost:3000/search/${searchword}${pageNumber}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancle = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  handleChangeWord = () => (e) => {
    const searchWord = e.target.value;
    this.setState({ searchWord: searchWord });
    /* this.setState({ searchWord: searchWord }, () => {
      this.fetchSearchResults(1, searchWord);
    }); */
    console.log(e.target.value);
  };

  handleChangeDate = () => (e) => {
    this.setState({ date: e.target.value });
    console.log(e.target.value);
  };

  handleSearchSubmit(e) {
    e.preventDefault();
    // const { searchWord, date } = this.state;
    // const payload = { searchWord, date };
    const payload = {
      searchWord: this.state.searchWord,
      date: this.state.date,
    };
    const { searchlist } = this.props;

    axios
      .post("http://13.125.112.243/laws", payload)
      .then((res) => {
        console.log(res.data);
        searchlist(res.data);
        const resultNotFoundMsg = !this.props.lawlist.length
          ? "검색 결과가 없습니다. 새로운 검색어를 입력해주세요"
          : "";
        this.setState({
          message: resultNotFoundMsg,
        });
        console.log(this.state.message); //searchlist는 함수가 아니라고 나옴 dispatch 해서 handleaction이 작동해야됨
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderSearchResults = () => {
    const results = this.props.lawlist;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <>
                <a key={result.id} href="나중에 넣을 링크">
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

  render() {
    const { searchWord, date } = this.state;
    return (
      <>
        <div className="search-container">
          <form className="search-form" onSubmit={this.handleSearchSubmit}>
            <div className="search-title">
              <span className="law">법령</span>
              <span className="date">날짜</span>
            </div>
            <label className="search-word">
              <input
                type="text"
                name="text"
                placeholder="검색어를 입력하세요"
                value={searchWord}
                onChange={this.handleChangeWord("text")}
              />
            </label>
            <label className="search-date">
              <input
                type="date"
                name="date"
                placeholder="대상 날짜"
                value={date}
                onChange={this.handleChangeDate("date")}
              />
            </label>
            <span className="search-btn">
              <button type="submit">검색</button>
            </span>
            <div>ㅌㅔ스ㅌㅡ{this.renderSearchResults()}</div>
          </form>
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
)(SearchBar);
