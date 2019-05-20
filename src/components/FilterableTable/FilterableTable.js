import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';
// actionCreators
import * as filterableTableActions from '../../redux/modules/filterableTable';
// import { selectedOption } from '../../redux/modules/filterableTable';
import { getResult, enumerateObjectValues1 } from '../../utils/enumerateObjectValues';

// <FilterableTable optionsArray={dropDownOptions} description='Filterable Product Table 1' />
// <FilterableTable optionsArray={dropDownOptions2} description='Filterable Product Table 2' />

// UI bindings
// @connect({mapStateToProps, mapDispatchToProps})
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
  // (dispatch, { as }) => bindActionCreators(filterableTableActions, dispatch, as)
  (dispatch, { as }) => bindActionCreators( { ...filterableTableActions }, dispatch, as)
)

class FilterableTable extends Component {

  static propTypes = {
    dropDownOptionSelected: PropTypes.string,
    error: PropTypes.bool,
    isLoading: PropTypes.bool,
    // fetchedData: PropTypes. .isRequired,
    // optionsArray: PropTypes.array.isRequired,
    // description: PropTypes.string,
    filterText: PropTypes.string,
    inStockOnly: PropTypes.bool,
    selectedOption: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
  };

  // static defaultProps = {};

  // handleFilterTextChange(filterText) {
  //   this.setState({ filterText: filterText });
  // };

  // handleInStockChange(inStockOnly) {
  //   this.setState({ inStockOnly: inStockOnly })
  // };

  handleFilterTextChange(filterText) {
    // this.setState({ filterText: filterText });
  }

  handleInStockChange(inStockOnly) {
    // this.setState({ inStockOnly: inStockOnly })
  }

  handleDropdownChange = (e) => {
    const { selectedOption } = this.props;
    // e.preventDefault();
    selectedOption({
      selected: e.target.value
    });
  };

  // ================================================================================================

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > props.description: ', this.props.description);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() > this.props.dropDownOptionSelected: ', this.props.dropDownOptionSelected);
  };

  componentDidUpdate(prevProps, prevState) {
    const { error, isLoading, fetchedData, dropDownOptionSelected, load } = this.props;
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() > this.props.dropDownOptionSelected: ', dropDownOptionSelected);
    if (fetchedData === null && !error && isLoading) {
      load({
        request: dropDownOptionSelected
      });
    }
  };

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate() > nextProps: ', nextProps);
    return nextProps;
  };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  //   return null;
  // };

  componentDidCatch(error, info) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  };

  // ===================================================================================
  // ===================================================================================
  // ===================================================================================

  enumerateObjectValues(obj, i, z) {

    let isArray = obj instanceof Array;

    if (i) {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&: ', i);
    }
    if (z === 1) {
      console.log('------------------------------------');
    }

    let o = Object.keys(obj)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. Object.keys(obj)!!!!: ', o);

    Object.keys(obj).forEach((prop, index) => {

      // ---------------------------------------------

      if (typeof(obj[prop]) === 'object') {

        // ---------------------------------------------

        if (!isArray) {

          index === 1 ? console.log('------------------------------') : null;

          if (obj[prop] !== null) {
            // "actor": { "id": 50583296, "login": "A-Amani" }
            // ################### OBJECT ###################:  3  ::  actor:
            console.log('################### OBJECT ###################: ', index, ' :: ', prop + ':');
          }

          if (obj[prop] === null) {
            console.log('======= NULL =============: ', prop + ': ' + obj[prop]);
          }
        }

        // ---------------------------------------------

        if (obj[prop] !== null && isArray) {

          console.log('>>>>>>>>>>>>>>>>>>>>>>> obj[prop]!!! <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);
          this.enumerateObjectValues(obj[prop], index, undefined);

        } else if (obj[prop] !== null) {

          this.enumerateObjectValues(obj[prop], undefined, index);

        }

      // ---------------------------------------------

      } else if (!isArray) {

        // ======= NON-OBJECT =======:  0  ::  category: Sporting Goods 1
        // ======= NON-OBJECT =======:  3  ::  price: 49.99
        console.log('======= NON-OBJECT =======: ', index, ' :: ', prop + ': ' + obj[prop]);

        if (z === 1 && index === 1) {
          console.log('------------------------------------');
        }

      }
    })
  };

  // ===================================================================================
  // ===================================================================================
  // ===================================================================================

  // >>>>>>>>>>>>>>>>>>>>>>> obj[prop]!!! <<<<<<<<<<<<<<<<<<<<<<:  
  // Object { category: "Kitchen Basics", stocked: true, name: "Dinnerware 1", price: "49.99", make: "Matte Finish", model: "MF1", seasonal: false, id: 45, customizable: true, count: 478, … }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&:  1 
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. Object.keys(obj)!!!!:  
  // Array(11) [ "category", "stocked", "name", "price", "make", "model", "seasonal", "id", "customizable", "count", … ]
  // ======= NON-OBJECT =======:  0  ::  category: Kitchen Basics 
  // ======= NON-OBJECT =======:  1  ::  stocked: true 
  // ======= NON-OBJECT =======:  2  ::  name: Dinnerware 1 
  // ======= NON-OBJECT =======:  3  ::  price: 49.99 
  // ======= NON-OBJECT =======:  4  ::  make: Matte Finish 
  // ======= NON-OBJECT =======:  5  ::  model: MF1 
  // ======= NON-OBJECT =======:  6  ::  seasonal: false 
  // ======= NON-OBJECT =======:  7  ::  id: 45 
  // ======= NON-OBJECT =======:  8  ::  customizable: true 
  // ======= NON-OBJECT =======:  9  ::  count: 478 
  // ======= NON-OBJECT =======:  10  ::  ordered: false 
  // >>>>>>>>>>>>>>>>>>>>>>> obj[prop]!!! <<<<<<<<<<<<<<<<<<<<<<:  
  // Object { category: "Kitchen Basics", stocked: true, name: "Picnic Set", price: "149.99", make: "Summer Country Picnic Set", model: "SCPS1", seasonal: true, id: 843, customizable: false, count: 13, … }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&:  2

  // node is basically a collection of callbacks that are executed in reaction to various events
  // a single main thread (event loop) that executes the callbacks
  // https://nodejs.org/api/all.html#process_process_nexttick_callback_args
  // https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
  // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
  // avoid blocking for very large loops
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
  // 'Array.forEach' blocking

  nextTickPromise() {
    return new Promise((resolve) => {
      process.nextTick(() => resolve());
    });
  }

  asyncForEach = async(array, cb) => {
    for (let i = 0; i < array.length; i++) {
      await cb(array[i], i, array)
    }
  }

  async enumerateObjectValuesB(obj, i, z) {
    let isArray = obj instanceof Array;
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& obj: ', obj);

    if (i) {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&: ', i);
    }
    if (z === 1) {
      console.log('------------------------------------');
    }

    let keys = Object.keys(obj);
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>. Object.keys(obj)!!!!: ', keys);
    
    // await this.asyncForEach(obj, async (prop, index, a) => {
    await this.asyncForEach(keys, async (prop, index, a) => {
      // ------------------------------------
      // await this.setTimeoutPromise(0)
      // await this.setTimeoutPromise(0)
      // await this.setImmediatePromise()
      await this.nextTickPromise()
      // ------------------------------------

      // console.log('################### 000000 ################### index: ', index);
      // console.log('################### 000000 ################### obj[prop]: ', obj[prop]);
      // console.log('################### 000000 ################### isArray: ', isArray);
      // console.log('################### 000000 ################### prop: ', prop);

      if (typeof(obj[prop]) === 'object') {

        // found an object "{}"
        console.log('------------------- 00000000 -----------------: ', obj[prop]);

        if (isArray) {
          // found an object "{}" and an instanceof Array and NULL or not
          console.log('------------------- 00000000 YA -----------------: ', obj[prop], ' :: ', obj[prop].length);
        } else {
          // console.log('------------------- 00000000 NA -----------------: ', obj[prop]);
          index === 1 ? console.log('----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXX--------------') : null;
        }

        if (!isArray) {

          // index === 1 ? console.log('------------------------------') : null;

          if (obj[prop] !== null) {
            console.log('################### OBJECT ###################: ', index, ' :: ', prop + ':');
          }

          if (obj[prop] === null) {
            console.log('======= NULL =============: ', prop + ': ' + obj[prop]);
          }
        }

        if (obj[prop] !== null) {

          console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv00000 <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);

          if (isArray) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv11111 YA <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop], ' :: ', obj[prop].length);
            this.enumerateObjectValues(obj[prop], index, undefined);

          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv2222  <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);
            this.enumerateObjectValues(obj[prop], undefined, index);
          }
        }
        // if (obj[prop] !== null) {

        //   console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv00000 <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);

        //   if (isArray) {
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv11111 YA <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop], ' :: ', obj[prop].length);
        //     this.enumerateObjectValuesB(obj[prop], index, undefined);

        //   } else {
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv2222  <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);
        //     this.enumerateObjectValuesB(obj[prop], undefined, index);
        //   }
        // }

      } else if (!isArray) {

        console.log('======= NON-OBJECT =======: ', index, ' :: ', prop + ': ' + obj[prop]);

        if (z === 1 && index === 1) {
          console.log('------------------------------------');
        }

      }
    })
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Done !')
  };
  enumerateObjectValues(obj, i, z) {

    let isArray = obj instanceof Array;
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& obj: ', obj);

    if (i) {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&: ', i);
    }
    if (z === 1) {
      console.log('------------------------------------');
    }

    Object.keys(obj).forEach((prop, index) => {

      // ---------------------------------------------

      if (typeof(obj[prop]) === 'object') {

        // found an object "{}"
        console.log('------------------- 00000000 -----------------: ', obj[prop]);

        if (isArray) {
          // found an object "{}" and an instanceof Array and NULL or not
          console.log('------------------- 00000000 YA -----------------: ', obj[prop], ' :: ', obj[prop].length);
        } else {
          // console.log('------------------- 00000000 NA -----------------: ', obj[prop]);
          index === 1 ? console.log('----------------XXXXXXXXXXXXXXXXXXXXXXXXXXXX--------------') : null;
        }

        if (!isArray) {

          // index === 1 ? console.log('------------------------------') : null;

          if (obj[prop] !== null) {
            console.log('################### OBJECT ###################: ', index, ' :: ', prop + ':');
          }

          if (obj[prop] === null) {
            console.log('======= NULL =============: ', prop + ': ' + obj[prop]);
          }
        }

        if (obj[prop] !== null) {

          console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv00000 <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);

          if (isArray) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv11111 YA <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop], ' :: ', obj[prop].length);
            this.enumerateObjectValues(obj[prop], index, undefined);

          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>> vvvv2222  <<<<<<<<<<<<<<<<<<<<<<: ', obj[prop]);
            this.enumerateObjectValues(obj[prop], undefined, index);
          }
        }

        // if (!isArray) {

        //   index === 1 ? console.log('------------------------------') : null;

        //   if (obj[prop] !== null) {
        //     console.log('################### OBJECT ###################: ', index, ' :: ', prop + ':');
        //   }

        //   if (obj[prop] === null) {
        //     console.log('======= NULL =============: ', prop + ': ' + obj[prop]);
        //   }
        // }

        // // ---------------------------------------------

        // if (obj[prop] !== null && isArray) {

        //   console.log('>>>>>>>>>>>>>>>>>>>>>>> REAL ARRAY! <<<<<<<<<<<<<<<<<<<<<<');
        //   this.enumerateObjectValues(obj[prop], index, undefined);

        // } else if (obj[prop] !== null) {

        //   this.enumerateObjectValues(obj[prop], undefined, index);

        // }

      } else if (!isArray) {

        console.log('======= NON-OBJECT =======: ', index, ' :: ', prop + ': ' + obj[prop]);

        if (z === 1 && index === 1) {
          console.log('------------------------------------');
        }

      }
    })
  };
  // ============================================
  // ============================================
  // ============================================

  render() {

    const styles = require('./scss/FilterableTable.scss');

    const { error, isLoading, dropDownOptionSelected, fetchedData } = this.props;
    const { optionsArray, description, filterText, inStockOnly } = this.props;

    const loadingText = 'Fetching Requested Data ...';
    const errorText = 'Error Fetching Requested Data !';
    let items = null;

    let enumeratedObject = [];

    // let arrayLike = fetchedData && fetchedData.length > 0
    //   ? arrayLike = true
    //   : arrayLike = null;

    // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData > ARRAYLIKE ??? ', arrayLike, '!');

    if (fetchedData) {
      this.enumerateObjectValuesB(fetchedData);
      // this.enumerateObjectValues(fetchedData);
      return (
        <div>{`${dropDownOptionSelected}`}</div>
      )
    }

    // if (fetchedData && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {
    //   console.log('########################################### AAAAAA #############################################')

    //   if (arrayLike) {

    //     items = Array.from(fetchedData).map((item, index) => {

    //       let fromItem = item;
    //       let fromIndex = index;
    //       let ok = Object.keys(fromItem).map((item, index) => {
    //         return <div key={index}>{`${fromIndex}: ${item}: ${fromItem[item]}`}</div>
    //       })

    //       return (
    //         <div key={fromIndex}>
    //           {ok}

    //           {fromIndex !== fetchedData.length-1 && (
    //             <div>---------</div>
    //           )}
    //         </div>
    //       )
    //     });

    //   } else {

    //     items = Object.keys(fetchedData).map((item, index) => {
    //       console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.keys(): index: ', index, ' item: ', item,' fetchedData[item]: ', fetchedData[item]);
    //       return <div key={index}>{`${index}: ${item}: ${fetchedData[item]}`}</div>;
    //     });
    //   }
    // } else {
    //   console.log('########################################### BBBBBB #############################################')
    // }

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > fetchedData: ', fetchedData);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > isLoading: ', isLoading);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > dropDownOptionSelected: ', dropDownOptionSelected);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > items:::::::::::::::::: ', items);
    // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.entries()::::::: ', Object.entries(fetchedData));

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className={`container-padding-border-radius-2`}>
          <div className="d-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <DropdownSelect
                title={description}
                optionsArray={optionsArray}
                dropDownOptionSelected={dropDownOptionSelected}
                onChange={this.handleDropdownChange}
              />

            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {dropDownOptionSelected !== '' &&
          !error &&
          isLoading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <Loading text={ loadingText } />

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !isLoading && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  <div className="alert alert-danger text-center" role="alert">{ errorText }</div>

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items !== null && (

            <div>
              <br/>
              <div className={`container-padding-border-radius-2`}>
                <div className="container-padding-border-radius-1">

                  {items}

                </div>
              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {fetchedData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items === null && (

            <div>
              <br/>
                <div className={`container-padding-border-radius-2`}>
                  <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                    <div className="width-400">

                      <SearchBar 
                        filterText={ filterText }
                        inStockOnly={ inStockOnly }
                        onFilterTextChange={ this.handleFilterTextChange }
                        onInStockChange={ this.handleInStockChange }
                      />

                    </div>
                  </div>

                  <br />

                  <div>

                    <Tables 
                      tablesData={ fetchedData } 
                      filterText={ filterText }
                      inStockOnly={ inStockOnly }
                    />

                  </div>
                </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
