import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ApiUtils, callApi } from '../utils/api';
import { fetchAccounts, fetchAccountsError, fetchAccountsSuccess } from './actions';
import { UserActionTypes } from './types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ApiUtils.apiUrl;

function* handleFetchAccounts(action: ReturnType<typeof fetchAccounts>) {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, `/account/getAccountsByUser/${action.payload}`); // mock

    if (res.err) {
      yield put(fetchAccountsError(res.error));
    } else {
      yield put(fetchAccountsSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchAccountsError(err.stack));
    } else {
      yield put(fetchAccountsError('An unknown error occurred.'));
    }
  }
}

function* watchFetchRecordsForRequest() {
  yield takeLatest(UserActionTypes.FETCH_ACCOUNTS, handleFetchAccounts);
}

function* usersSaga() {
  yield all([
    fork(watchFetchRecordsForRequest),
  ]);
}

export default usersSaga;
