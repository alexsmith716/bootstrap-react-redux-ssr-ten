import { take, put, call, fork, select, all } from 'redux-saga/effects';


/***************************** Subroutines ************************************/




/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/



// docs/advanced/RootSaga.md
export default function* root() {
  yield fork()
  yield fork()
  yield fork()
}