import { Action } from '@ngrx/store';

export enum MessageActionTypes {
  ErrorMessage = '[Message] Error message'
}

export class ErrorMessage implements Action {
  readonly type = MessageActionTypes.ErrorMessage;
}

export type MessageActions = ErrorMessage;
