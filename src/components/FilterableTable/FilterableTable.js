import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
// actionCreators
import * as filterableTableActions from '../../redux/modules/filterableTable';

// <FilterableTable optionsArray={dropDownOptions} description='Filterable Product Table 1' />
// <FilterableTable optionsArray={dropDownOptions2} description='Filterable Product Table 2' />

// UI bindings
@connect(
  (state, { as }) => ({ 
    dropDownOptionSelected: state.filterableTableCollection[as].dropDownOptionSelected,
    error: state.filterableTableCollection[as].error,
    isLoading: state.filterableTableCollection[as].isLoading,
    fetchedData: state.filterableTableCollection[as].fetchedData,
    // optionsArray: state.filterableTableCollection[as].optionsArray,
    // description: state.filterableTableCollection[as].description,
    filterText: state.filterableTableCollection[as].filterText,
    inStockOnly: state.filterableTableCollection[as].inStockOnly,
  }),
  (dispatch, { as }) => bindActionCreators(filterableTableActions, dispatch, as)
)

class FilterableTable extends Component {

  static propTypes = {
    // dropDownOptionSelected: PropTypes.string,
    // error: PropTypes.string,
    // isLoading: PropTypes.string,
    // fetchedData: PropTypes.string,
    // optionsArray: PropTypes.array.isRequired,
    // description: PropTypes.string,
    // filterText: PropTypes.string,
    // inStockOnly: PropTypes.string,
    // handleFilterTextChange: PropTypes.func.isRequired,
    // handleInStockChange: PropTypes.func.isRequired,
    // handleDropdownChange: PropTypes.func.isRequired,
  };

  // static defaultProps = {};

  // handleFilterTextChange(filterText) {
  //   this.setState({ filterText: filterText });
  // };

  // handleInStockChange(inStockOnly) {
  //   this.setState({ inStockOnly: inStockOnly })
  // };

  // handleDropdownChange = (e) => {
  //   let { fetchedData, dropDownOptionSelected } = this.state;

  //   if (e.target.value !== '') {
  //     this.setState({ error: false, isLoading: true, fetchedData: null, dropDownOptionSelected: e.target.value });
  //   }
  // };

  // ================================================================================================

  // setTimeoutCallback = (d) => this.setState({ error: null, isLoading: null, fetchedData: d });

  // requestDataPromise(r) {
  //   this._asyncRequest = axios.get(r)
  //     .then(response => {
  //       console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > JSON >>>>>> response: ', response);
  //       console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > JSON > response.data: ', response.data);
  //       this._asyncRequest = null;
  //       // this.setState({ fetchedData: response.data, isLoading: false });
  //       setTimeout( () => this.setTimeoutCallback(response.data), 2000 );
  //     })
  //     .catch(error => {
  //       if (error.fetchedData) {
  //         // The request was made and the server responded with a status code that falls out of the range of 2xx
  //         console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.data: ', error.response.data);
  //         console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.status: ', error.response.status);
  //         console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.headers: ', error.response.headers);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.message: ', error.message);
  //       }
  //       console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.config: ', error.config);
  //       this.setState({ error: true, isLoading: false, fetchedData: null });
  //     });
  // }

  // ================================================================================================

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() <<<<<<<<<<<<<<: ', this.props.description);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    // const { error, isLoading, fetchedData, dropDownOptionSelected } = this.state;
    // if (fetchedData === null && !error && isLoading) {
    //   this.requestDataPromise(`${dropDownOptionSelected}`);
    // }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate() > nextProps: ', nextProps);
    return nextProps;
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  //   return null;
  // }

  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  }

  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { error, isLoading, dropDownOptionSelected, fetchedData } = this.props;
    const { optionsArray, description  } = this.props;
    const { handleFilterTextChange, handleInStockChange, handleDropdownChange } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    const errorText = 'Error Fetching Requested Data !';
    let items = null;

    let arrayLike = fetchedData && fetchedData.length > 0
      ? arrayLike = true
      : arrayLike = null;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData > ARRAYLIKE ??? ', arrayLike, '!');

    if (fetchedData && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {

      console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData.length: ', fetchedData.length);

      // convert array-like object into array
      if (arrayLike) {

        // const listItems1 = Array.prototype.slice.call(fetchedData);
        // listItems1.map(item => { 
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData > Array.prototype.slice.call(): ', item);
        // });

        // const listItems2 = Array.from(fetchedData);
        // listItems2.map(item => { 
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData > Array.from(): ', item);
        // });

        // Array.from(fetchedData).forEach((item, index) => {
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Array.from()1: index: ', index, ' item: ', item);
        // });

        // items = Array.from(fetchedData).map((item, index) => {
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Array.from()2: index: ', index, ' item: ', item);
        //   return <div key={index}>{`${index}: ${item}`}</div>;
        // });

        items = Array.from(fetchedData).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div>
              {ok}

              {fromIndex !== fetchedData.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(fetchedData).map((item, index) => {
          // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.keys(): index: ', index, ' item: ', item,' fetchedData[item]: ', fetchedData[item]);
          return <div key={index}>{`${index}: ${item}: "${fetchedData[item]}"`}</div>;
        });

        // items = Object.keys(fetchedData).map((item, index) => (
        //   <div key={index}>{`${index}: ${item}: "${fetchedData[item]}"`}</div>
        // ));

      }

      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > dropDownOptionSelected: ', dropDownOptionSelected);
      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > items:::::::::::::::::: ', items);
      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.entries()::::::: ', Object.entries(fetchedData));
      // items = <div>{JSON.stringify(fetchedData)}</div>;
    }

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className={`container-padding-border-radius-2`}>
          <div className="container-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <DropdownSelect
                title={description}
                optionsArray={optionsArray}
                dropDownOptionSelected={dropDownOptionSelected}
                onChange={handleDropdownChange}
              />

            </div>
          </div>
        </div>

        <br/>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {dropDownOptionSelected !== '' &&
          !error &&
          isLoading && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                <Loading text={ loadingText } />

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !isLoading && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                <div className="alert alert-danger text-center" role="alert">{ errorText }</div>

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items !== null && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                {items}

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items === null && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                <div className="width-400">

                  <SearchBar 
                    filterText={ this.state.filterText }
                    inStockOnly={ this.state.inStockOnly }
                    onFilterTextChange={ handleFilterTextChange }
                    onInStockChange={ handleInStockChange }
                  />

                </div>
              </div>

              <br />

              <div>

                <Tables 
                  tablesData={ fetchedData } 
                  filterText={ this.state.filterText }
                  inStockOnly={ this.state.inStockOnly }
                />

              </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
