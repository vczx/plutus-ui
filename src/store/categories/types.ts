export interface Category {
  id: number;
  category: string;
  description: string;
  type: string;
}

export enum CategoriesActionTypes {
  FETCH_CATEGORIES = '@@categories/FETCH_CATEGORIES',

  FETCH_SUCCESS = '@@categories/FETCH_SUCCESS',
  FETCH_ERROR = '@@categories/FETCH_ERROR',
}

export interface CategoriesState {
  readonly loading: boolean;
  readonly data: Category[];
  readonly errors?: string;
}
