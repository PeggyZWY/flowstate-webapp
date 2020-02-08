import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { store } from './store';
import { GlobalStyle } from './style';
import Compose from './components/Compose';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <GlobalStyle />
          <HashRouter>
            <Route path='/' exact component={Compose}></Route>
          </HashRouter>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
