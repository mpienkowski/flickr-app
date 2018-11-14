import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '../models/photo.model';
import { PhotoActions, PhotoActionTypes } from '../actions/photo.actions';

export interface State extends EntityState<Photo> {
  loadedPages: number;
  isLoading: boolean;
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = adapter.getInitialState({
  loadedPages: 0,
  isLoading: false
});

export function reducer(
  state = initialState,
  action: PhotoActions
): State {
  switch (action.type) {
    case PhotoActionTypes.AddPhoto: {
      return adapter.addOne(action.payload.photo, state);
    }

    case PhotoActionTypes.UpsertPhoto: {
      return adapter.upsertOne(action.payload.photo, state);
    }

    case PhotoActionTypes.AddPhotos: {
      return {...adapter.addMany(action.payload.photos, state), loadedPages: state.loadedPages + 1, isLoading: false};
    }

    case PhotoActionTypes.UpsertPhotos: {
      return adapter.upsertMany(action.payload.photos, state);
    }

    case PhotoActionTypes.UpdatePhoto: {
      return adapter.updateOne(action.payload.photo, state);
    }

    case PhotoActionTypes.UpdatePhotos: {
      return adapter.updateMany(action.payload.photos, state);
    }

    case PhotoActionTypes.DeletePhoto: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PhotoActionTypes.DeletePhotos: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PhotoActionTypes.LoadPhotos: {
      return adapter.addAll(action.payload.photos, state);
    }

    case PhotoActionTypes.ClearPhotos: {
      return {...adapter.removeAll(state), loadedPages: 0};
    }

    case PhotoActionTypes.FetchNextPageOfPhotos: {
      return {...state, isLoading: true};
    }

    case PhotoActionTypes.FetchFailed: {
      return {...state, isLoading: false};
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
