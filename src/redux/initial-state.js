// import { List } from 'immutable';

export default {

  device: {
    isMobile: null,
  },

  counter: {
    countPreloadedState: null,
    countMultireducer: 0,
  },

  filterableTable: {
    loaded: false,
    dropDownOptionSelected: '',
    error: false,
    isLoading: false,
    fetchedData: null,
    didInvalidate: false,
  },

  temperatureCalculator: {
    temperature: '',
    scale: 'c',
  },

};