import { createSelector } from '@ngrx/store';
import { RootState } from '../reducers';

export const selectFilter = createSelector((state: RootState) => state.filter);
