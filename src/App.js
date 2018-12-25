import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Layout from './containers/Layout';

import Router from './router';
import configureStore from './redux/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Router />
        </Layout>
      </Provider>
    );
  }
}

export default App;
