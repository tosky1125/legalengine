import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import NavBar from './components/Nav';
import ViewPage from './components/ViewPage';
import Footer from './components/Footer';
import SearchResult from './components/SearchResult';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/search' component={SearchResult} />
          <Route path='/view' component={ViewPage} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
