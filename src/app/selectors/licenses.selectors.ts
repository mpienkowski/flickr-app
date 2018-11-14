import { createSelector } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectAll } from '../reducers/license.reducer';

export const selectAllLicenses = createSelector((state: RootState) => state.licenses, selectAll);
