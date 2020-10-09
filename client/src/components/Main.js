import React, { Component } from 'react';
import SearchBar from './SearchBar';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main'>
        <SearchBar />
      </div>
    );
  }
}

export default Main;
