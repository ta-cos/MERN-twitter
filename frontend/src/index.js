import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { BrowserRouter, Route } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/explore">
          <h1>Coming Soon</h1>
        </Route>
        <Route path="/profile">
          <h1>Coming Soon</h1>
        </Route>
      </>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
