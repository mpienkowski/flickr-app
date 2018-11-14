import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class MessageEffects {

  constructor(private actions$: Actions) {}
}
