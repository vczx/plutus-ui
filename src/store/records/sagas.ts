import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ApiUtils, callApi } from '../utils/api';
import { addRecord, addRecordError, addRecordSuccess, fetchError, fetchRecordsFor, fetchSuccess } from './actions';
import { RecordsActionTypes } from './types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ApiUtils.apiUrl;

function* handleFetchRecordsFor(action: ReturnType<typeof fetchRecordsFor>) {
  try {
    const res = yield call(callApi, 'get', API_ENDPOINT, `/transaction/getTransactionByMonth/${action.payload.account_id}/${action.payload.date}`);

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

function* handleNewRecord(action: ReturnType<typeof addRecord>) {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, `/transaction/addNewTransaction`, action.payload);

    if (res.err) {
      yield put(addRecordError(res.error));
    } else {
      yield put(addRecordSuccess(action.payload));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(addRecordError(err.stack));
    } else {
      yield put(addRecordError('An unknown error occured.'));
    }
  }
}

function* watchFetchRecordsForRequest() {
  yield takeLatest(RecordsActionTypes.FETCH_RECORDS_FOR, handleFetchRecordsFor);
}

function* watchAddRecordRequest() {
  yield takeLatest(RecordsActionTypes.ADD_RECORD, handleNewRecord);
}

function* recordsSaga() {
  yield all([
    fork(watchFetchRecordsForRequest),
    fork(watchAddRecordRequest),
  ]);
}

export default recordsSaga;
