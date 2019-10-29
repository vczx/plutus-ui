import { action } from 'typesafe-actions';
import { Category, CategoriesActionTypes } from './types';

export const fetchCategories = () => action(CategoriesActionTypes.FETCH_CATEGORIES);

export const fetchSuccess = (data: Category[]) => action(CategoriesActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(CategoriesActionTypes.FETCH_ERROR, message);
