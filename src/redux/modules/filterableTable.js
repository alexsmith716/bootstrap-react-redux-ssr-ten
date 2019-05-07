// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// Actions
const LOAD = 'redux-example/filterableTable/LOAD';
const LOAD_SUCCESS = 'redux-example/filterableTable/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/filterableTable/LOAD_FAIL';

const HANDLE_FILTER_TEXT_CHANGE = 'redux-example/filterableTable/HANDLE_FILTER_TEXT_CHANGE';
const HANDLE_IN_STOCK_CHANGE = 'redux-example/filterableTable/HANDLE_IN_STOCK_CHANGE';
const HANDLE_DROPDOWN_CHANGE = 'redux-example/filterableTable/HANDLE_DROPDOWN_CHANGE';

import initialState from '../initial-state';

// filterableTable: {
//   loaded: false,
//   dropDownOptionSelected: '',
//   error: false,
//   isLoading: false,
//   fetchedData: null,
//   didInvalidate: false,
// },

// Reducer
export default function reducer(state = initialState.filterableTable, action = {}) {

  switch (action.type) {

    case LOAD:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        fetchedData: action.result
      };

    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.error
      };

    default:
      return state;
  }
}

// Action Creators
// export function isLoaded(globalState) {
//   return globalState.filterableTable && globalState.filterableTable.loaded;
// }

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get('/load-info')
  };
}

export function handleFilterTextChange() {
  return {
    type: HANDLE_FILTER_TEXT_CHANGE
  };
}

export function handleInStockChange() {
  return {
    type: HANDLE_IN_STOCK_CHANGE
  };
}

export function handleDropdownChange() {
  return {
    type: HANDLE_DROPDOWN_CHANGE
  };
}


// side effects, only as applicable (e.g. thunks, epics, etc)

// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
