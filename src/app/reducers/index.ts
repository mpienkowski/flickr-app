import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPhoto from './photo.reducer';
import * as fromFilter from './filter.reducer';

export interface RootState {
  photo: fromPhoto.State;
  filter: fromFilter.State;
}

export const reducers: ActionReducerMap<RootState> = {
  photo: fromPhoto.reducer,
  filter: fromFilter.reducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
