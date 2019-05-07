// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// Actions


// Reducer
import initialState from '../initial-state';


export default function reducer(state = initialState.device, action) {

  switch (action.type) {

    default:
      return state;
  }
}

// Action Creators
