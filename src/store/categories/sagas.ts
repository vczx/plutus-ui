import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ApiUtils, callApi } from '../utils/api';
import { fetchError, fetchSuccess } from './actions';
import { CategoriesActionTypes } from './types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ApiUtils.apiUrl;

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ApiUtils.mockUrl;

function* handleFetchCategories() {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, '/transaction/getAllTransactionCategories'); // no error
    // const res = yield call(callApi, 'get', API_ENDPOINT, '/5db56c473200004f0018bf61'); // mock

    if (res.err) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

function* watchFetchCategoriesRequest() {
  yield takeEvery(CategoriesActionTypes.FETCH_CATEGORIES, handleFetchCategories);
}

function* categoriesSaga() {
  yield all([
    fork(watchFetchCategoriesRequest),
  ]);
}

export default categoriesSaga;
