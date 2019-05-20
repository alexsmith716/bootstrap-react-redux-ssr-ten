// isolate concerns within a Redux application (modules)
// https://github.com/erikras/ducks-modular-redux

// middleware
// allow some actions to pass a "promise generator"
// https://github.com/reduxjs/redux/issues/99

// Actions
// -------------------
const LOAD = 'redux-example/filterableTable/LOAD';
const LOAD_SUCCESS = 'redux-example/filterableTable/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/filterableTable/LOAD_FAIL';

const SELECTED_OPTION = 'redux-example/filterableTable/SELECTED_OPTION';

const HANDLE_FILTER_TEXT_CHANGE = 'redux-example/filterableTable/HANDLE_FILTER_TEXT_CHANGE';
const HANDLE_IN_STOCK_CHANGE = 'redux-example/filterableTable/HANDLE_IN_STOCK_CHANGE';
const HANDLE_DROPDOWN_CHANGE = 'redux-example/filterableTable/HANDLE_DROPDOWN_CHANGE';

import axios from 'axios';
// import axiosClient from '../../utils/axiosClient';
// import axiosClientInstance from '../../utils/axiosClientInstance';

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
// -------------------
export default function reducer(state = initialState.filterableTable, action = {}) {

  switch (action.type) {

    case SELECTED_OPTION:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > SELECTED_OPTION > state: ', state);
      return {
        ...state,
        filterText: '',
        inStockOnly: false,
        error: false,
        isLoading: true,
        fetchedData: null,
        dropDownOptionSelected: action.option,
      };

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD > state: ', state);
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_SUCCESS > state: ', state);
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_SUCCESS > action.result: ', action.result);
      return {
        ...state,
        error: null,
        isLoading: false,
        fetchedData: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > LOAD_FAIL > state: ', state);
      return {
        ...state,
        error: true,
        isLoading: false,
      };

    default:
      console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > SWITCH > action.type > default > state: ', state);
      return state;
  }
}

// Action Creators
// -------------------
export function selectedOption(value) {
  return {
    type: SELECTED_OPTION,
    option: value.selected
  };
};

export function loadAction() {
  return {
    type: LOAD
  }
};

export function loadSuccess(fetchedData) {
  return {
    type: LOAD_SUCCESS,
    result: fetchedData
  }
};

export function loadFailure(error) {
  return {
    type: LOAD_FAIL,
  }
};

export function load(value) {
  return dispatch => {
    dispatch(loadAction());

    return axios.get(value.request)
      .then(response => {
        console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > axios > load() > typeof  RESPONSE.data: ', typeof response.data)
        console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > axios > load() > RESPONSE.data: ', response.data)
        // console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > axios > load() > RESPONSE > JSON.stringify: ', JSON.stringify(response.data))
        dispatch(loadSuccess(response.data))
        // setTimeout( () => dispatch(loadSuccess(response.data)), 1000 )
      })
      .catch(error => {
        console.log('>>>>>>>>>>>>>>>> filterableTable > reducer > axios > load() > ERROR.data: ', error.response ? error.response.data : error)
        dispatch(loadFailure(error.response ? error.response.data : error))
        // setTimeout( () => dispatch(loadFailure(error.response ? error.response.data : error)), 1000 )
      })
  }
}
