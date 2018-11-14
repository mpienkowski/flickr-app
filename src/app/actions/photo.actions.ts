import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Photo } from '../models/photo.model';

export enum PhotoActionTypes {
  LoadPhotos = '[Photo] Load Photos',
  AddPhoto = '[Photo] Add Photo',
  UpsertPhoto = '[Photo] Upsert Photo',
  AddPhotos = '[Photo] Add Photos',
  UpsertPhotos = '[Photo] Upsert Photos',
  UpdatePhoto = '[Photo] Update Photo',
  UpdatePhotos = '[Photo] Update Photos',
  DeletePhoto = '[Photo] Delete Photo',
  DeletePhotos = '[Photo] Delete Photos',
  ClearPhotos = '[Photo] Clear Photos',
  FetchNextPageOfPhotos = '[Photo] Fetch Next Page of Photos',
  FetchFailed = '[Photo] Fetch Failed',
}

export class LoadPhotos implements Action {
  readonly type = PhotoActionTypes.LoadPhotos;

  constructor(public payload: { photos: Photo[] }) {}
}

export class AddPhoto implements Action {
  readonly type = PhotoActionTypes.AddPhoto;

  constructor(public payload: { photo: Photo }) {}
}

export class UpsertPhoto implements Action {
  readonly type = PhotoActionTypes.UpsertPhoto;

  constructor(public payload: { photo: Photo }) {}
}

export class AddPhotos implements Action {
  readonly type = PhotoActionTypes.AddPhotos;

  constructor(public payload: { photos: Photo[] }) {}
}

export class UpsertPhotos implements Action {
  readonly type = PhotoActionTypes.UpsertPhotos;

  constructor(public payload: { photos: Photo[] }) {}
}

export class UpdatePhoto implements Action {
  readonly type = PhotoActionTypes.UpdatePhoto;

  constructor(public payload: { photo: Update<Photo> }) {}
}

export class UpdatePhotos implements Action {
  readonly type = PhotoActionTypes.UpdatePhotos;

  constructor(public payload: { photos: Update<Photo>[] }) {}
}

export class DeletePhoto implements Action {
  readonly type = PhotoActionTypes.DeletePhoto;

  constructor(public payload: { id: string }) {}
}

export class DeletePhotos implements Action {
  readonly type = PhotoActionTypes.DeletePhotos;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPhotos implements Action {
  readonly type = PhotoActionTypes.ClearPhotos;
}

export class FetchNextPageOfPhotos implements Action {
  readonly type = PhotoActionTypes.FetchNextPageOfPhotos;
}

export class FetchFailed implements Action {
  readonly type = PhotoActionTypes.FetchFailed;
}

export type PhotoActions =
 LoadPhotos
 | AddPhoto
 | UpsertPhoto
 | AddPhotos
 | UpsertPhotos
 | UpdatePhoto
 | UpdatePhotos
 | DeletePhoto
 | DeletePhotos
 | ClearPhotos
 | FetchNextPageOfPhotos
 | FetchFailed;
