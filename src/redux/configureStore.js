import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import createSagaMiddleware, { END } from 'redux-saga';
// import sagaMonitor from '@redux-saga/simple-saga-monitor';

import thunk from 'redux-thunk';
import { reduxBatch } from '@manaflair/redux-batch';
import rootReducer from './reducers';
// import notify from 'redux-notify';
// import events from './events';

// ----------------------------------------------------------------------
// utilize generator pattern and make code behave synchronously

// const middleware = [thunk];
// const middleware = createSagaMiddleware({ sagaMonitor })
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// state shape
function combine(reducers) {
  return combineReducers(reducers);
};

// ----------------------------------------------------------------------

const configureStore = ({history, preloadedState}) => {

  console.log('>>>>>>>>>>>>>>>>> configureStore > preloadedState:', preloadedState);

  // ----------------------------------------------------------------------
  // middleware.push(notify(events));

  // logger must be the last middleware in chain
  // collapsed: (takes a Boolean or optionally a Function that receives 'getState' 
  //             function for accessing current store state and 'action' object as parameters. 
  //             Returns 'true' if the log group should be collapsed, 'false' otherwise.)
  if (__CLIENT__ && __DEVELOPMENT__) {
    const logger = require('redux-logger').createLogger({collapsed: true}); // custom options
    middleware.push(logger);
  }

  const enhancers = [applyMiddleware(...middleware)];

  // ----------------------------------------------------------------------

  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools').default;

    Array.prototype.push.apply(enhancers, [
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]);
  }

  const finalEnhancer = compose(...enhancers);

  // ----------------------------------------------------------------------

  const store = createStore(
    combine(rootReducer(history)),
    preloadedState,
    // reduxBatch,
    finalEnhancer
  )

  // ----------------------------------------------------------------------

  if (__DEVELOPMENT__ && module.hot) {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > MODULE.HOT! <<<<<<<<<<<<<<<<<');
    module.hot.accept('./reducers', () => {
      let reducer = require('./reducers').default;
      reducer = combine(reducer(history));
      store.replaceReducer(reducer);
    });
  } else {
    console.log('>>>>>>>>>>>>>>>>>>> configureStore > NO MODULE.HOT! <<<<<<<<<<<<<<');
  }

  // ----------------------------------------------------------------------

  // 'enhance' the Store with method `runSaga`
  // (use the method to start the root Saga of the application)
  store.runSaga = sagaMiddleware.run;
  // special action `END`
  // If you dispatch the END action, 
  //   then all Sagas blocked on a take Effect will be terminated regardless of the specified pattern. 
  // If the terminated Saga has still some forked tasks which are still running, 
  //   it will wait for all the child tasks to terminate before terminating the Task
  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
