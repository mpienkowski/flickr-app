import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPhoto from './photo.reducer';
import * as fromFilter from './filter.reducer';
import * as fromLicenses from './license.reducer';

export interface RootState {
  photo: fromPhoto.State;
  filter: fromFilter.State;
  licenses: fromLicenses.State;
}

export const reducers: ActionReducerMap<RootState> = {
  photo: fromPhoto.reducer,
  filter: fromFilter.reducer,
  licenses: fromLicenses.reducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
