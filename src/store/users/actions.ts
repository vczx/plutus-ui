import { action } from 'typesafe-actions';

import { User, UserAccount, UserActionTypes } from './types';

export const setUser = (user?: User) => action(UserActionTypes.SET_USER, user);
export const fetchAccounts = (user_id: string) => action(UserActionTypes.FETCH_ACCOUNTS, user_id);

export const fetchAccountsSuccess = (accounts: UserAccount[]) => action(UserActionTypes.FETCH_ACCOUNTS_SUCCESS, accounts);
export const fetchAccountsError = (message: string) => action(UserActionTypes.FETCH_ACCOUNTS_ERROR, message);
