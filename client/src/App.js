import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import NavBar from './components/Nav';
// import SearchResult from './components/SearchResult';
import ViewPage from './components/ViewPage';
import Footer from './components/Footer';
import SR from './components/SR';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/search' component={SR} />
          <Route path='/view' component={ViewPage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
