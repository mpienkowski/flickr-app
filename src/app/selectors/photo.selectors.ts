import { createSelector } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectAll } from '../reducers/photo.reducer';

export const selectAllPhotos = createSelector((state: RootState) => state.photo, selectAll);

export const selectIsLoading = createSelector((state: RootState) => state.photo.isLoading);

export const selectLoadedPages = createSelector((state: RootState) => state.photo.loadedPages);
