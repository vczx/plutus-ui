export interface UserAccount {
  accountNickName: string;
  accountType: string;
  id: number;
  balance: number;
}

export interface User {
  user_id: string;
  name: string;
  surname: string;
  accounts: UserAccount[];
}

export enum UserActionTypes {
  SET_USER = '@@users/SET_USER',
  FETCH_ACCOUNTS = '@@users/FETCH_ACCOUNTS',
  FETCH_ACCOUNTS_SUCCESS = '@@users/FETCH_ACCOUNTS_SUCCESS',
  FETCH_ACCOUNTS_ERROR = '@@users/FETCH_ACCOUNTS_ERROR',
}

export interface UserState {
  readonly user?: User;
  loading: boolean;
}
