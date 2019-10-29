import { action } from 'typesafe-actions';
import { FinancialRecord, RecordsActionTypes } from './types';

export const fetchRecordsFor = (request: { account_id: number, date: string }) => action(RecordsActionTypes.FETCH_RECORDS_FOR, request);

export const fetchSuccess = (data: FinancialRecord[]) => action(RecordsActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(RecordsActionTypes.FETCH_ERROR, message);

export const addRecord = (newRecord: FinancialRecord) => action(RecordsActionTypes.ADD_RECORD, newRecord);
export const addRecordSuccess = (newRecord: FinancialRecord) => action(RecordsActionTypes.ADD_RECORD_SUCCESS, newRecord);
export const addRecordError = (message: string) => action(RecordsActionTypes.ADD_RECORD_ERROR, message);
