import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  SetText = '[Filter] Set Text',
  SetLicenses = '[Filter] Set Licence'
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


export type FilterActions = SetText
  | SetLicenses;
