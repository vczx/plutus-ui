import { Reducer } from 'redux';
import moment from 'moment';

import { RecordsActionTypes, RecordsState } from './types';

export const initialState: RecordsState = {
  date: moment().toDate(),
  data: [],
  account: undefined,
  errors: undefined,
  loading: false,
  showSuccess: false
};

const reducer: Reducer<RecordsState> = (state = initialState, action) => {
  switch (action.type) {
    case RecordsActionTypes.FETCH_RECORDS_FOR: {
      return { ...state, loading: true, date: moment(action.payload.date).add(1, 'days').toDate() };
    }
    case RecordsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case RecordsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, data: [], errors: action.payload };
    }
    case RecordsActionTypes.ADD_RECORD: {
      return { ...state, loading: true };
    }
    case RecordsActionTypes.ADD_RECORD_SUCCESS: {
      let newData = state.data.concat({
        ...action.payload,
        amount: action.payload.amount * (action.payload.category.type === 'DR' ? 1 : -1)
      });
      return { ...state, loading: false, data: newData, showSuccess: true };
    }
    case RecordsActionTypes.ADD_RECORD_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as recordsReducer };
