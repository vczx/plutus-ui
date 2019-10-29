import { Reducer } from 'redux';
import { UserActionTypes, UserState } from './types';

export const initialState: UserState = {
  user: undefined,
  loading: false
};

const reducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return { ...state, user: action.payload };
    }
    case UserActionTypes.FETCH_ACCOUNTS: {
      return { ...state, accounts: [], loading: true };
    }
    case UserActionTypes.FETCH_ACCOUNTS_SUCCESS: {
      return { ...state, user: { ...state.user, accounts: action.payload }, loading: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
