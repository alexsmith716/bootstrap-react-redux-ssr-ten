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
      return {
        ...state,
        error: false,
        isLoading: true,
        externalData: null,
        dropDownOptionSelected: action.option,
      };

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> filterableTable > SWITCH > action.type > LOAD!!!: ', action.type);
      return {
        ...state,
        isLoading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> filterableTable > SWITCH > action.type > LOAD_SUCCESS!!!: ', action.type);
      return {
        ...state,
        error: null,
        isLoading: null,
        externalData: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> filterableTable > SWITCH > action.type > LOAD_FAIL!!!: ', action.type);
      return {
        ...state,
        error: true,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Action Creators
// -------------------
export function selectedOption(value) {
  console.log('>>>>>>>>>>>>>>>> filterableTable > selectedOption(value) > value.selected: ', value.selected);
  return {
    type: SELECTED_OPTION,
    option: value.selected
  };
};

export function loadAction() {
  console.log('>>>>>>>>>>>>>>>> filterableTable > loadAction() <<<<<<<<<<<<<<<<<');
  return {
    type: LOAD
  }
};

export function loadSuccess(externalData) {
  console.log('>>>>>>>>>>>>>>>> filterableTable > loadSuccess() > externalData:', externalData.data);
  return {
    type: LOAD_SUCCESS,
    result: externalData.data
  }
};

export function loadFailure(error) {
  console.log('>>>>>>>>>>>>>>>> filterableTable > loadFailure() > error:', error);
  return {
    type: LOAD_FAIL,
  }
};

export function load(value) {
  return dispatch => {
    dispatch(loadAction());

    return axios.get(value.request)
      .then(response => {
        console.log('>>>>>>>>>>>>>>>> axiosClient.then(response) <<<<<<<<<<<<<<<<<<<<<<')
        dispatch(loadSuccess(response))
      })
      .catch(error => {
        console.log('>>>>>>>>>>>>>>>> axiosClient.catch(error) <<<<<<<<<<<<<<<<<<<<<<')
        dispatch(loadFailure(error))
      })
  }
}
