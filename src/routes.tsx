import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Global } from '@emotion/core';

import { Header, Root } from './components/layout';
import IndexPage from './views/index';
import LoginPage from './views/login';
import RecordsPage from './views/records';
import TrendsPage from './views/trends';
import normalize from './styles/normalize';
import globals from './styles/globals';

// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.FC = () => (
  <Root>
    <Global styles={normalize} />
    <Global styles={globals} />
    <Header title='Plutus' />
    <Switch>
      <Route exact path='/' component={IndexPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/records' component={RecordsPage} />
      <Route path='/trends' component={TrendsPage} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
  </Root>
);

export default Routes;
