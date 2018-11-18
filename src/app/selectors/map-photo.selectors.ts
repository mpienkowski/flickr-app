import { createSelector } from '@ngrx/store';
import { RootState } from '../reducers';
import { selectAll } from '../reducers/map-photo.reducer';

export const selectAllMapPhotos = createSelector((state: RootState) => state.mapPhoto, selectAll);
export const selectIsFetching = createSelector((state: RootState) => state.mapPhoto.isFetching);
