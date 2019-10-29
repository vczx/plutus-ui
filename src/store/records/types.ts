import { UserAccount } from '../users';
import { Category } from '../categories';

export interface FinancialRecord {
  accountId?: number;
  category?: Category;
  title: string;
  amount?: number;
  date: string;
}

export enum RecordsActionTypes {
  FETCH_RECORDS_FOR = '@@records/FETCH_RECORDS_FOR',

  FETCH_SUCCESS = '@@records/FETCH_SUCCESS',
  FETCH_ERROR = '@@records/FETCH_ERROR',

  ADD_RECORD = '@@records/ADD_RECORD',
  ADD_RECORD_SUCCESS = '@@records/ADD_RECORD_SUCCESS',
  ADD_RECORD_ERROR = '@@records/ADD_RECORD_ERROR',
}

export interface RecordsState {
  readonly loading: boolean;
  readonly showSuccess: boolean;
  readonly date: Date;
  readonly account: UserAccount | undefined;
  readonly data: FinancialRecord[];
  readonly errors?: string;
}
