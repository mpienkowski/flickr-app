import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Photo } from '../models/photo.model';

export enum MapPhotoActionTypes {
  LoadMapPhotos = '[MapPhoto] Load MapPhotos',
  AddMapPhoto = '[MapPhoto] Add MapPhoto',
  UpsertMapPhoto = '[MapPhoto] Upsert MapPhoto',
  AddMapPhotos = '[MapPhoto] Add MapPhotos',
  UpsertMapPhotos = '[MapPhoto] Upsert MapPhotos',
  UpdateMapPhoto = '[MapPhoto] Update MapPhoto',
  UpdateMapPhotos = '[MapPhoto] Update MapPhotos',
  DeleteMapPhoto = '[MapPhoto] Delete MapPhoto',
  DeleteMapPhotos = '[MapPhoto] Delete MapPhotos',
  ClearMapPhotos = '[MapPhoto] Clear MapPhotos',
  FetchMapPhotos = '[MapPhoto] Fetch Map Photos',
  FetchFailed = '[MapPhoto] Fetch Failed',
}

export class LoadMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.LoadMapPhotos;

  constructor(public payload: { mapPhotos: Photo[] }) {}
}

export class AddMapPhoto implements Action {
  readonly type = MapPhotoActionTypes.AddMapPhoto;

  constructor(public payload: { mapPhoto: Photo }) {}
}

export class UpsertMapPhoto implements Action {
  readonly type = MapPhotoActionTypes.UpsertMapPhoto;

  constructor(public payload: { mapPhoto: Photo }) {}
}

export class AddMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.AddMapPhotos;

  constructor(public payload: { mapPhotos: Photo[] }) {}
}

export class UpsertMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.UpsertMapPhotos;

  constructor(public payload: { mapPhotos: Photo[] }) {}
}

export class UpdateMapPhoto implements Action {
  readonly type = MapPhotoActionTypes.UpdateMapPhoto;

  constructor(public payload: { mapPhoto: Update<Photo> }) {}
}

export class UpdateMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.UpdateMapPhotos;

  constructor(public payload: { mapPhotos: Update<Photo>[] }) {}
}

export class DeleteMapPhoto implements Action {
  readonly type = MapPhotoActionTypes.DeleteMapPhoto;

  constructor(public payload: { id: string }) {}
}

export class DeleteMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.DeleteMapPhotos;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.ClearMapPhotos;
}

export class FetchMapPhotos implements Action {
  readonly type = MapPhotoActionTypes.FetchMapPhotos;
}

export class FetchFailed implements Action {
  readonly type = MapPhotoActionTypes.FetchFailed;
}

export type MapPhotoActions =
 LoadMapPhotos
 | AddMapPhoto
 | UpsertMapPhoto
 | AddMapPhotos
 | UpsertMapPhotos
 | UpdateMapPhoto
 | UpdateMapPhotos
 | DeleteMapPhoto
 | DeleteMapPhotos
 | ClearMapPhotos
 | FetchMapPhotos
 | FetchFailed;
