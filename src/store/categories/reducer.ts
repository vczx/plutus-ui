import { Reducer } from 'redux';

import { CategoriesActionTypes, CategoriesState } from './types';

export const initialState: CategoriesState = {
  data: [],
  loading: false
};

const reducer: Reducer<CategoriesState> = (state = initialState, action) => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES: {
      return { ...state, loading: true, data: [] };
    }
    case CategoriesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CategoriesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, data: [], errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as categoriesReducer };
