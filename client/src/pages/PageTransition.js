import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './PageTransition.css';
import Main from './Main';
import ViewPage from './ViewPage';
import SearchResult from './SearchResult';

function PageTransition({ location }) {
  // 페이지 전환 시 에니메이션 효과 (새창 X)
  return (
    <div>
      <TransitionGroup className='transition-group'>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames='fade'
        >
          <section className='route-section'>
            <Switch location={location}>
              <Route path='/' exact component={Main} />
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
