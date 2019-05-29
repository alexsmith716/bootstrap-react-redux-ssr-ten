import { call, takeLatest, put, all, race, delay, take, fork  } from 'redux-saga/effects';
import axios from 'axios';

// 'rootSaga'       responsible for starting other Sagas
// ----------
// 'yield select()' returns the result of 'selector(getState())'
// ----------
// 'yield all([])'  start all Sagas at once
// 'yield all([])'  run multiple Effects in parallel and wait for all of them to complete
// ----------
// 'yield fork()'   use them in parallel
// ----------
// 'fork()'         perform a non-blocking call on `fn`
// 'fork()'         used to invoke both normal and Generator functions
// 'fork()'         creates a Task (process running in background) (a redux-saga app can have multiple tasks running in parallel)
// 'fn: Function'   A Generator function, or normal function which returns a Promise as result


export function fetchPostsApi(reddit) {
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data))
}


export function* watchFilterableTableDropDownSelected() {
  console.log('>>>>>>>>> SAGA > sagas > watchFilterableTableDropDownOptionSelected <<<<<<<<<<<<<<')
  while (true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(actions.SELECT_REDDIT)

    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchFilterableTableDropDownSelected)
  ])
}
