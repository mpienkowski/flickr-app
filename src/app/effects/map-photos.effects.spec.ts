import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MapPhotosEffects } from './map-photos.effects';
import { FlickrApiService } from '../flickr-api.service';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RootState } from '../reducers';
import { flickrApiMockService } from '../../test-helpers/flickr-api-mock.service';
import { cold, hot } from 'jasmine-marbles';
import { ErrorMessage } from '../actions/message.actions';
import { FetchFailed, FetchMapPhotos, LoadMapPhotos, UpsertMapPhotos } from '../actions/map-photo.actions';
import { sampleListOfPhotos } from '../../test-helpers/sample-photo';
import { SetBbox } from '../actions/filter.actions';
import { sampleBbox } from '../../test-helpers/sample-bbox';

describe('MapPhotosEffects', () => {
  let actions$: Observable<any>;
  let effects: MapPhotosEffects;
  let store: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({...fromRoot.reducers})],
      providers: [
        MapPhotosEffects,
        provideMockActions(() => actions$),
        {provide: FlickrApiService, useValue: flickrApiMockService}
      ]
    });

    store = TestBed.get(Store);
    effects = TestBed.get(MapPhotosEffects);

  });

  describe('loadMapPhotos$', () => {
    it('should dispatch LoadMapPhotos', () => {
      store.dispatch(new SetBbox(sampleBbox() as any));

      const action = new FetchMapPhotos();
      const completion = new LoadMapPhotos({mapPhotos: sampleListOfPhotos()});

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.loadMapPhotos$).toBeObservable(expected);
    });

    it('should dispatch FetchFailed', () => {
      store.dispatch(new SetBbox(sampleBbox() as any));

      const action = new FetchMapPhotos();
      const completion = new FetchFailed();

      spyOn(TestBed.get(FlickrApiService), 'searchPhotos').and.throwError('fetch failed');

      actions$ = hot('--a-', {a: action});
      const expected = cold('--(b|)', {b: completion});

      expect(effects.loadMapPhotos$).toBeObservable(expected);
    });
  });

  describe('upsertMapPhotos$', () => {
    it('should dispatch UpsertMapPhotos', () => {
      const action = new SetBbox(sampleBbox() as any);
      const completion = new UpsertMapPhotos({mapPhotos: sampleListOfPhotos()});

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.upsertMapPhotos$).toBeObservable(expected);
    });

    it('should dispatch FetchFailed', () => {
      const action = new SetBbox(sampleBbox() as any);
      const completion = new FetchFailed();

      spyOn(TestBed.get(FlickrApiService), 'searchPhotos').and.throwError('fetch failed');

      actions$ = hot('--a-', {a: action});
      const expected = cold('--(b|)', {b: completion});

      expect(effects.upsertMapPhotos$).toBeObservable(expected);
    });
  });

  describe('handleErrors$', () => {
    it('should dispatch ErrorMessage', () => {
      const action = new FetchFailed();
      const completion = new ErrorMessage(`Couldn't fetch mapped photos, please try again`, new FetchMapPhotos());

      actions$ = hot('--a-', {a: action});
      const expected = cold('--b', {b: completion});

      expect(effects.handleErrors$).toBeObservable(expected);
    });
  });
});
