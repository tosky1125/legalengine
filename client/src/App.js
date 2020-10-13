import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/Nav";
import SearchResult from "./components/SearchResult";
import PaginatedContent from "./components/Pagination";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/search" component={SearchResult} />
          <Route path="/page" component={PaginatedContent} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
