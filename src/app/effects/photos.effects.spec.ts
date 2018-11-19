import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PhotosEffects } from './photos.effects';
import { FlickrApiService } from '../flickr-api.service';
import { flickrApiMockService } from '../../test-helpers/flickr-api-mock.service';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { cold, hot } from 'jasmine-marbles';
import { AddPhotos, FetchFailed, FetchNextPageOfPhotos } from '../actions/photo.actions';
import { ErrorMessage } from '../actions/message.actions';
import { sampleListOfPhotos } from '../../test-helpers/sample-photo';

describe('PhotosEffects', () => {
  let actions$: Observable<any>;
  let effects: PhotosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({...fromRoot.reducers})],
      providers: [
        PhotosEffects,
        provideMockActions(() => actions$),
        {provide: FlickrApiService, useValue: flickrApiMockService}
      ]
    });

    effects = TestBed.get(PhotosEffects);
  });

  describe('fetchNextPage$', () => {
    it('should dispatch ErrorMessage', () => {
      const action = new FetchNextPageOfPhotos();
      const completion = new AddPhotos({photos: sampleListOfPhotos()});

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.fetchNextPage$).toBeObservable(expected);
    });

    it('should dispatch ErrorMessage', () => {
      const action = new FetchNextPageOfPhotos();
      const completion = new FetchFailed();

      spyOn(TestBed.get(FlickrApiService), 'searchPhotos').and.throwError('fetch failed');

      actions$ = hot('--a-', {a: action});
      const expected = cold('--(b|)', {b: completion});

      expect(effects.fetchNextPage$).toBeObservable(expected);
    });
  });

  describe('handleErrors$', () => {
    it('should dispatch ErrorMessage', () => {
      const action = new FetchFailed();
      const completion = new ErrorMessage(`Couldn't fetch photos, please try again`, new FetchNextPageOfPhotos());

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.handleErrors$).toBeObservable(expected);
    });
  });
});
