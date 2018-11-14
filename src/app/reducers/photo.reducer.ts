import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Photo } from '../models/photo.model';
import { PhotoActions, PhotoActionTypes } from '../actions/photo.actions';

export interface State extends EntityState<Photo> {
  storedPages: number;
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = adapter.getInitialState({
  storedPages: 0
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
      return {...adapter.addMany(action.payload.photos, state), storedPages: state.storedPages + 1};
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
      return {...adapter.removeAll(state), storedPages: 0};
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
