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
