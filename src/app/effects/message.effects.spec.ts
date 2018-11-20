import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { MessageEffects } from './message.effects';
import { FlickrApiService } from '../flickr-api.service';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RootState } from '../reducers';
import { flickrApiMockService } from '../../test-helpers/flickr-api-mock.service';
import { hot } from 'jasmine-marbles';
import { FetchLicenses } from '../actions/license.actions';
import { ErrorMessage } from '../actions/message.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { first } from 'rxjs/operators';

describe('MessageEffects', () => {
  let actions$: Observable<any>;
  let effects: MessageEffects;
  let store: Store<RootState>;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({...fromRoot.reducers}), MatSnackBarModule],
      providers: [
        MessageEffects,
        provideMockActions(() => actions$),
        {provide: FlickrApiService, useValue: flickrApiMockService}
      ]
    });

    effects = TestBed.get(MessageEffects);

    store = TestBed.get(Store);
    snackBar = TestBed.get(MatSnackBar);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('handleErrorMessages$', () => {
    it('should use SnackBar to convey the message', () => {
      const message = 'the message';
      const action = new ErrorMessage(message);
      const settings = {duration: 10000};

      spyOn(snackBar, 'open').and.returnValue({onAction: () => of(null)});

      actions$ = hot('--a-', {a: action});

      effects.handleErrorMessages$.pipe(first()).subscribe(() => {
        expect(snackBar.open).toHaveBeenCalledWith(message, null, settings);
      });
    });

    it('should dispatch retry action when user clicks button on snack bar', () => {
      const message = 'the message';
      const getRetryAction = () => new FetchLicenses();
      const action = new ErrorMessage(message, getRetryAction());
      const settings = {duration: 10000};

      spyOn(snackBar, 'open').and.returnValue({onAction: () => of(null)});

      actions$ = hot('--a-', {a: action});

      effects.handleErrorMessages$.pipe(first()).subscribe(() => {
        expect(snackBar.open).toHaveBeenCalledWith(message, 'Retry', settings);
        expect(store.dispatch).toHaveBeenCalledWith(getRetryAction());
      });
    });
  });
});
