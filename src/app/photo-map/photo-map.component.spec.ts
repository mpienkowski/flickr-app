import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoMapComponent } from './photo-map.component';
import { usedMaterialModules } from '../usedMaterialModules';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RootState } from '../reducers';
import { GeolocationService } from '../geolocation.service';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FlickrPhotoMockComponent } from '../../test-helpers/flickr-photo-mock.component';
import { geolocationMockService } from '../../test-helpers/geolocation-mock.service';
import { LoadMapPhotos } from '../actions/map-photo.actions';
import { samplePhoto } from '../../test-helpers/sample-photo';
import { skip } from 'rxjs/operators';
import { samplePosition } from '../../test-helpers/sample-position';
import { SetBbox } from '../actions/filter.actions';

describe('PhotoMapComponent', () => {
  let component: PhotoMapComponent;
  let fixture: ComponentFixture<PhotoMapComponent>;
  let store: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoMapComponent, FlickrPhotoMockComponent],
      imports: [
        ...usedMaterialModules,
        StoreModule.forRoot({...fromRoot.reducers}),
        AgmCoreModule.forRoot({apiKey: 'fake key'}),
        AgmSnazzyInfoWindowModule
      ],
      providers: [
        {provide: GeolocationService, useValue: geolocationMockService}
      ]
    });
    fixture = TestBed.createComponent(PhotoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should share an observable with all mapped photos from the store', (done) => {
    const getPhotos = () => ([samplePhoto('1'), samplePhoto('2')]);

    component.photos.pipe(skip(1)).subscribe(photos => {
      expect(photos).toContain(getPhotos()[0]);
      expect(photos).toContain(getPhotos()[1]);
      expect(photos.length).toEqual(getPhotos().length);
      done();
    });

    store.dispatch(new LoadMapPhotos({mapPhotos: getPhotos()}));
    fixture.detectChanges();
  });

  it('should share an observable with isFetching flag from the store', (done) => {
    component.isFetching.pipe(skip(1)).subscribe(isFetching => {
      expect(isFetching).toBe(true);
      done();
    });
  });

  it('should share a promise with users Position', (done) => {
    component.currentPosition.then(position => {
      expect(position).toEqual(samplePosition());
      done();
    });
  });

  describe('on bounds change', () => {
    it('should dispatch SetBbox if details window is closed', () => {
      const getBounds = (): any => ({some: 'bounds'});
      component.onDetailsOpenChange(false);
      component.onBoundsChange(getBounds());

      expect(store.dispatch).toHaveBeenCalledWith(new SetBbox(getBounds()));
    });

    it('should not dispatch SetBbox if details window is open', () => {
      const getBounds = (): any => ({some: 'bounds'});
      component.onDetailsOpenChange(true);
      component.onBoundsChange(getBounds());

      expect(store.dispatch).not.toHaveBeenCalledWith(new SetBbox(getBounds()));
    });
  });

});
