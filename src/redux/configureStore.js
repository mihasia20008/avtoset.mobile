import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as rootReducer from './rootReducer';

export default () => {
  let middlewares = [thunk];

  // eslint-disable-next-line no-undef
  if (__DEV__ !== 'production') {
    middlewares.push(logger);
  }

  const globalReducer = combineReducers(rootReducer);

  middlewares = applyMiddleware(...middlewares);

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    // eslint-disable-next-line no-undef
    __DEV__ !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;
  /* eslint-enable */

  // eslint-disable-next-line no-undef
  if (__DEV__ !== 'production') {
    middlewares = composeEnhancers(middlewares);
  }

  return createStore(globalReducer, middlewares);
};
