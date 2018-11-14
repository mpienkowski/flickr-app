import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPhoto from './photo.reducer';

export interface State {

  photo: fromPhoto.State;
}

export const reducers: ActionReducerMap<State> = {

  photo: fromPhoto.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
