import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { adapter } from '../reducers/photo.reducer';

const adapterSelectors = adapter.getSelectors();

export const selectAllPhotos = createSelector((state: State) => state.photo, adapterSelectors.selectAll);
