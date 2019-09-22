import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { store } from './store';
import { GlobalStyle } from './style';
import Compose from './components/Compose';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <GlobalStyle />
          <BrowserRouter>
            <Route path='/' exact component={Compose}></Route>
          </BrowserRouter>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
