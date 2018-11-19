import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSearchComponent } from './photo-search.component';
import { usedMaterialModules } from '../usedMaterialModules';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { RootState } from '../reducers';
import { NgxMasonryModule } from 'ngx-masonry';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AddPhotos, ClearPhotos, FetchNextPageOfPhotos } from '../actions/photo.actions';
import { samplePhoto } from '../../test-helpers/sample-photo';
import { By } from '@angular/platform-browser';
import { FlickrPhotoMockComponent } from '../../test-helpers/flickr-photo-mock.component';

describe('PhotoSearchComponent', () => {
  let component: PhotoSearchComponent;
  let fixture: ComponentFixture<PhotoSearchComponent>;
  let store: Store<RootState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoSearchComponent, FlickrPhotoMockComponent],
      imports: [
        ...usedMaterialModules,
        StoreModule.forRoot({...fromRoot.reducers}),
        NgxMasonryModule,
        InfiniteScrollModule
      ]
    });
    fixture = TestBed.createComponent(PhotoSearchComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should dispatch ClearPhotos', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new ClearPhotos());
  });

  it('should dispatch FetchNextPageOfPhotos', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new FetchNextPageOfPhotos());
  });

  it('should display spinner only when data is loading', () => {
    const spinner = () => fixture.nativeElement.querySelector('mat-spinner');

    fixture.detectChanges();
    expect(spinner()).toBeDefined();

    store.dispatch(new AddPhotos({photos: []}));
    fixture.detectChanges();
    expect(spinner()).toBeNull();
  });

  it('should display fetched photos in masonry grid', () => {
    const photos = [samplePhoto('1'), samplePhoto('2'), samplePhoto('3')];

    fixture.detectChanges();
    store.dispatch(new AddPhotos({photos}));
    fixture.detectChanges();
    fixture.detectChanges();

    const photosDebug = fixture.debugElement.queryAll(By.css('app-flickr-photo'));
    const ngrxMasonryItemsDebug = fixture.debugElement.queryAll(By.css('ngxMasonryItem'));
    photos.map((photo, index) => expect(ngrxMasonryItemsDebug[index].children).toContain(photosDebug[index]));
  });

  it('should dispatch FetchNextPageOfPhotos on scroll', () => {
    component.onScroll();
    expect(store.dispatch).toHaveBeenCalledWith(new FetchNextPageOfPhotos());
  });

  it('should use infiniteScroll directive', () => {
    const infiniteScroll = fixture.nativeElement.querySelector('[infiniteScroll]');
    expect(infiniteScroll).toBeDefined();
  });
});
