import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MapPhotosEffects } from './map-photos.effects';

describe('MapPhotosEffects', () => {
  let actions$: Observable<any>;
  let effects: MapPhotosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapPhotosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MapPhotosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
