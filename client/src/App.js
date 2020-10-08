import React from 'react';
import axios from 'axios';

axios.default.withCredentrial = true;
class App extends React.Component {
  componentDidMount() {
    // axios({
    //   method: 'GET',
    //   url: 'http://13.125.112.243/data',
    //   withCredentrial: true,
    // }).then((res) => {
    //   console.log(res.data);
    // });

    axios
      .post(
        'http://13.125.112.243/search',
        { title: '변호사법' },
        {
          withCredentrial: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  render() {
    return <div className='App'>Carillon Project has started!</div>;
  }
}

export default App;
