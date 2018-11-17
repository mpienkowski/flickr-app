import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Photo } from '../models/photo.model';
import { MapPhotoActions, MapPhotoActionTypes } from '../actions/map-photo.actions';

export interface State extends EntityState<Photo> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: MapPhotoActions
): State {
  switch (action.type) {
    case MapPhotoActionTypes.AddMapPhoto: {
      return adapter.addOne(action.payload.mapPhoto, state);
    }

    case MapPhotoActionTypes.UpsertMapPhoto: {
      return adapter.upsertOne(action.payload.mapPhoto, state);
    }

    case MapPhotoActionTypes.AddMapPhotos: {
      return adapter.addMany(action.payload.mapPhotos, state);
    }

    case MapPhotoActionTypes.UpsertMapPhotos: {
      return adapter.upsertMany(action.payload.mapPhotos, state);
    }

    case MapPhotoActionTypes.UpdateMapPhoto: {
      return adapter.updateOne(action.payload.mapPhoto, state);
    }

    case MapPhotoActionTypes.UpdateMapPhotos: {
      return adapter.updateMany(action.payload.mapPhotos, state);
    }

    case MapPhotoActionTypes.DeleteMapPhoto: {
      return adapter.removeOne(action.payload.id, state);
    }

    case MapPhotoActionTypes.DeleteMapPhotos: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case MapPhotoActionTypes.LoadMapPhotos: {
      return adapter.addAll(action.payload.mapPhotos, state);
    }

    case MapPhotoActionTypes.ClearMapPhotos: {
      return adapter.removeAll(state);
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
  selectTotal,
} = adapter.getSelectors();
