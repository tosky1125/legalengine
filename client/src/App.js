import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/Nav';
import Footer from './components/Footer';
import PageTransition from "./PageTransition";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <PageTransition />
        <Footer />
      </Router>
    </div>
  );
}

export default App;