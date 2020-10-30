import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './PageTransition.css';
import Main from './components/Main';
import ViewPage from './components/ViewPage';
import SearchResult from './components/SearchResult';

function PageTransition({ location }) {
  return (
    <div>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'fade'}
        >
          <section className='route-section'>
            <Switch location={location}>
              <Route path exact='/'  component={Main} />
              <Route path='/search' component={SearchResult} />
              <Route path='/law/:key' component={ViewPage} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(PageTransition);