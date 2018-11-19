import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LicenseEffects } from './license.effects';
import { FlickrApiService } from '../flickr-api.service';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { flickrApiMockService } from '../../test-helpers/flickr-api-mock.service';
import { cold, hot } from 'jasmine-marbles';
import { AddLicenses, FetchFailed, FetchLicenses } from '../actions/license.actions';
import { sampleListOfLicenses } from '../../test-helpers/sample-license';
import { FetchMapPhotos } from '../actions/map-photo.actions';
import { ErrorMessage } from '../actions/message.actions';

fdescribe('LicenseEffects', () => {
  let actions$: Observable<any>;
  let effects: LicenseEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({...fromRoot.reducers})],
      providers: [
        LicenseEffects,
        provideMockActions(() => actions$),
        {provide: FlickrApiService, useValue: flickrApiMockService}
      ]
    });

    effects = TestBed.get(LicenseEffects);
  });

  describe('fetchLicenses$', () => {
    it('should dispatch AddLicenses', () => {
      const action = new FetchLicenses();
      const completion = new AddLicenses({licenses: sampleListOfLicenses()});

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.fetchLicenses$).toBeObservable(expected);
    });

    it('should dispatch FetchFailed', () => {
      const action = new FetchLicenses();
      const completion = new FetchFailed();

      spyOn(TestBed.get(FlickrApiService), 'fetchLicenses').and.throwError('fetch failed');

      actions$ = hot('--a-', {a: action});
      const expected = cold('--(b|)', {b: completion});

      expect(effects.fetchLicenses$).toBeObservable(expected);
    });
  });

  describe('handleErrors$', () => {
    it('should dispatch ErrorMessage', () => {
      const action = new FetchFailed();
      const completion = new ErrorMessage(`Couldn't fetch licenses, please try again`, new FetchLicenses());

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.handleErrors$).toBeObservable(expected);
    });
  });
});
