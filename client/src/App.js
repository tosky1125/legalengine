import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import NavBar from './components/Nav';
import SearchR from './components/SearchR';
import ViewPage from './components/ViewPage';
import SearchResult from './components/SearchResult';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/test' component={SearchResult} />
          <Route path='/search' component={SearchR} />
          <Route path='/view' component={ViewPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
