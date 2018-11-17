import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  SetText = '[Filter] Set Text',
  SetLicenses = '[Filter] Set Licence',
  SetMinDate = '[Filter] Set Min Date',
  SetMaxDate = '[Filter] Set Max Date',
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

export type FilterActions = SetText
  | SetLicenses
  | SetMinDate
  | SetMaxDate;
