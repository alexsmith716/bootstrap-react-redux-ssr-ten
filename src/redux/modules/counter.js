// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// Actions
const INCREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/INCREMENT_COUNTER_PRELOADED_STATE';
const DECREMENT_COUNTER_PRELOADED_STATE = 'redux-example/counter/DECREMENT_COUNTER_PRELOADED_STATE';

const INCREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/INCREMENT_COUNTER_MULTIREDUCER';
const DECREMENT_COUNTER_MULTIREDUCER = 'redux-example/counter/DECREMENT_COUNTER_MULTIREDUCER';

import initialState from '../initial-state';

// counter: {
//   countPreloadedState: null,
//   countMultireducer: 0
// },

// Reducer
export default function reducer(state = initialState.counter, action = {}) {

  // GOT IT!!!!
  // have to return back ENTIRE state object (modified and un-modified)

  switch (action.type) {

    case INCREMENT_COUNTER_PRELOADED_STATE:
      console.log('>>>>>>>>>>>>>>>> counter > SWITCH > action.type > 11111111111: ', (state.countPreloadedState + 1), ' >:::> ', state);
      return {
        ...state,
        countPreloadedState: state.countPreloadedState + 1,
      };

    case DECREMENT_COUNTER_PRELOADED_STATE:
      console.log('>>>>>>>>>>>>>>>> counter > SWITCH > action.type > 2222222222222: ', (state.countPreloadedState - 1), ' >:::> ', state);
      return {
        ...state,
        countPreloadedState: state.countPreloadedState - 1,
      };

    case INCREMENT_COUNTER_MULTIREDUCER:
      console.log('>>>>>>>>>>>>>>>> counter > SWITCH > action.type > 3333333333333333: ', (state.countMultireducer + 1), ' >:::> ', state);
      return {
        ...state,
        countMultireducer: state.countMultireducer + 1,
      };

    case DECREMENT_COUNTER_MULTIREDUCER:
      console.log('>>>>>>>>>>>>>>>> counter > SWITCH > action.type > 44444444444444444: ', (state.countMultireducer - 1), ' >:::> ', state);
      return {
        ...state,
        countMultireducer: state.countMultireducer - 1,
      };

    default:
      console.log('>>>>>>>>>>>>>>>> counter > SWITCH > action.type > 555555555555555555: ', state);
      return state;
  }
}


// Action Creators
export function incrementPreloadedState() {
  return {
    type: INCREMENT_COUNTER_PRELOADED_STATE
  };
}

export function decrementPreloadedState() {
  return {
    type: DECREMENT_COUNTER_PRELOADED_STATE
  };
}

export function incrementMultireducer() {
  return {
    type: INCREMENT_COUNTER_MULTIREDUCER
  };
}

export function decrementMultireducer() {
  return {
    type: DECREMENT_COUNTER_MULTIREDUCER
  };
}


// side effects, only as applicable (e.g. thunks, epics, etc)

// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
