import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import Fund from './Components/Fund';
import history from './Components/history';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router history={history}>
      <Switch>
        <Route path="/fund" component={Fund} />
        <Route path="/" component={App} />
      </Switch>
      </Router>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
