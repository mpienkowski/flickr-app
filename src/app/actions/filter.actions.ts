import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  SetText = '[Filter] Set Text'
}

export class SetText implements Action {
  readonly type = FilterActionTypes.SetText;

  constructor(public payload: string) {
  }
}

export type FilterActions = SetText;
