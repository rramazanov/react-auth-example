import React, {Suspense} from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';

import './app.scss';

const routes = [
  {
    path: '/login',
    exact: true,
    roles: ['ANONYMOUS'],
    component: React.lazy(() => import('../pages/auth'))
  },
  {
    path: '/profile',
    exact: true,
    roles: ['USER', 'ADMIN'],
    component: React.lazy(() => import('../pages/profile'))
  },
  {
    path: '/registration',
    exact: true,
    roles: ['ANONYMOUS'],
    component: React.lazy(() => import('../pages/auth'))
  },
  {
    path: '/about',
    exact: true,
    roles: ['ANONYMOUS, USER, ADMIN'],
    component: React.lazy(() => import('../pages/about'))
  }
]

function NotFound() {
  return <div style={{textAlign: 'center'}}>Page not found</div>
}

function PageLoader() {
  return <div style={{textAlign: 'center'}}>Загрузка...</div>;
}

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <div className="app">
        <Suspense fallback={<PageLoader/>}>
          <Switch>
            <Redirect from="/" to={token ? '/profile' : '/login'} exact/>
            {routes.map(({path, exact, component}) =>
              <Route key={path} path={path} exact={exact} component={component}/>)}
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </div>
      <div className="footer">
        <Link className="link" to="/about">About</Link>
      </div>
    </>
  );
}

export default App;
