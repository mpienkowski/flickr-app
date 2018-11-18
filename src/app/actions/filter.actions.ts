import { Action } from '@ngrx/store';
import { LatLngBounds } from '@agm/core';
import { Author } from '../models/author.model';

export enum FilterActionTypes {
  SetText = '[Filter] Set Text',
  SetLicenses = '[Filter] Set Licence',
  SetMinDate = '[Filter] Set Min Date',
  SetMaxDate = '[Filter] Set Max Date',
  SetBbox = '[Filter] Set Bbox',
  SetAuthor = '[Filter] Set Author',
}

export class SetText implements Action {
  readonly type = FilterActionTypes.SetText;

  constructor(public payload: string) {
  }
}

export class SetLicenses implements Action {
  readonly type = FilterActionTypes.SetLicenses;

  constructor(public payload: string[]) {
  }
}

export class SetMinDate implements Action {
  readonly type = FilterActionTypes.SetMinDate;

  constructor(public payload: Date) {
  }
}

export class SetMaxDate implements Action {
  readonly type = FilterActionTypes.SetMaxDate;

  constructor(public payload: Date) {
  }
}

export class SetBbox implements Action {
  readonly type = FilterActionTypes.SetBbox;

  constructor(public payload: LatLngBounds) {
  }
}

export class SetAuthor implements Action {
  readonly type = FilterActionTypes.SetAuthor;

  constructor(public payload: Author) {
  }
}

export type FilterActions = SetText
  | SetLicenses
  | SetMinDate
  | SetMaxDate
  | SetBbox
  | SetAuthor;
