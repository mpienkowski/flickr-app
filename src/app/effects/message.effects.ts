import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ErrorMessage, MessageActionTypes } from '../actions/message.actions';
import { Action, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';
import { RootState } from '../reducers';


@Injectable()
export class MessageEffects {

  @Effect({dispatch: false})
  public handleErrorMessages$: Observable<Action> = this.actions$.pipe(
    ofType(MessageActionTypes.ErrorMessage),
    tap((action: ErrorMessage) => {
      const snackBar = this.snackBar.open(action.message, action.actionToRetry ? 'Retry' : null, {duration: 10000});
      if (action.actionToRetry) {
        snackBar.onAction().subscribe(() => this.store.dispatch(action.actionToRetry));
      }
    })
  );

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private store: Store<RootState>) {
  }
}
