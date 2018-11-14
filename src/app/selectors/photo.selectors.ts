import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { adapter, selectAll } from '../reducers/photo.reducer';

export const selectAllPhotos = createSelector((state: State) => state.photo, selectAll);

export const selectIsLoading = createSelector((state: State) => state.photo.isLoading);

export const selectLoadedPages = createSelector((state: State) => state.photo.loadedPages);
