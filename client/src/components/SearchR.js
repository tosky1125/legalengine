import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import * as searchlist from "../modules/searchlist";
function SearchR() {
  const [post, setpost] = useState([]);
  return (
    <div className="searchR">
      <SearchB />
    </div>
  );
}
export default connect(
  (state) => ({
    lawlist: state.searchlist.lawlist,
  }),
  (dispatch) => ({
    searchlist: (data) => dispatch(searchlist.searchlist(data)),
  })
)(SearchR);
