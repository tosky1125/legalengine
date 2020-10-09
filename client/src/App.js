import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import NavBar from "./components/Nav";
import SearchResult from "./components/SearchResult";

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
    // axios
    //   .post(
    //     'http://13.125.112.243/search',
    //     { title: '변호사법' },
    //     {
    //       withCredentrial: true,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/search" component={SearchResult} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
