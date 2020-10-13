import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/Nav";
import SearchR from "./components/SearchR";
import Pagination from "./components/Pagination";
import SearchResult from "./components/SearchResult";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/search" component={SearchResult} />
          <Route path="/page" component={SearchR} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
