import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import * as searchlist from "../modules/searchlist";

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      message: "",
    };
  }

  //필요 states: 페이지당 표시할 Post 수, 전체 post 데이터, 현재 페이지

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
          <div>
            {this.props.lawlist.length === 0
              ? "변호사법(임시)"
              : this.props.lawlist[0].name}
            <div>
              <span>
                {this.props.lawlist.length === 0
                  ? "법률(임시)"
                  : this.props.lawlist[0].type}{" "}
                |{" "}
                {this.props.lawlist.length === 0
                  ? "2349032 호(임시)"
                  : this.props.lawlist[0].number}{" "}
                |{" "}
                {this.props.lawlist.length === 0
                  ? "타법개정(임시)"
                  : this.props.lawlist[0].amendment_status}{" "}
                |{" "}
                {this.props.lawlist.length === 0
                  ? "법무부(임시)"
                  : this.props.lawlist[0].ministry}
              </span>
              <span>
                공표일자:
                {this.props.lawlist.length === 0
                  ? "공표일자:2020.10.01"
                  : this.props.lawlist[0].promulgation_date}{" "}
                시행일:
                {this.props.lawlist.length === 0
                  ? "시행일:2020.10.01"
                  : this.props.lawlist[0].enforcement_date}
              </span>
              <span></span>
            </div>
          </div>
          <div>1 2 3 4 5 </div>
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
