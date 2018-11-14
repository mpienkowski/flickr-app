import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ErrorMessage, MessageActionTypes } from '../actions/message.actions';
import { Action, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';
import { State } from '../reducers';


@Injectable()
export class MessageEffects {

  @Effect({dispatch: false})
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(MessageActionTypes.ErrorMessage),
    tap((action: ErrorMessage) => {
      const snackBar = this.snackBar.open(action.message, action.actionToRetry ? 'Retry' : null);
      if (action.actionToRetry) {
        snackBar.afterDismissed().toPromise().then(() => this.store.dispatch(action.actionToRetry));
      }
    })
  );

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,
              private store: Store<State>) {
  }
}
