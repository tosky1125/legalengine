import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Nav';
import Footer from './components/Footer';
import PageTransition from './pages/PageTransition';

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
