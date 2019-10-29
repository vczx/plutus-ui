import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { layoutReducer, LayoutState } from './layout';

import { recordsReducer, RecordsState } from './records';
import recordsSaga from './records/sagas';
import { userReducer, UserState } from './users';
import usersSaga from './users/sagas';
import { categoriesReducer, CategoriesState } from './categories';
import categoriesSaga from './categories/sagas';

// The top-level state object
export interface ApplicationState {
  layout: LayoutState;
  user: UserState;
  categories: CategoriesState;
  records: RecordsState;
  router: RouterState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer,
    user: userReducer,
    categories: categoriesReducer,
    records: recordsReducer,
    router: connectRouter(history)
  });

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([
    fork(usersSaga),
    fork(categoriesSaga),
    fork(recordsSaga),
  ]);
}
