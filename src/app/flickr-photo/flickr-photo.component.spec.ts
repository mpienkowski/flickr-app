import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrPhotoComponent } from './flickr-photo.component';
import { Photo } from '../models/photo.model';
import { usedMaterialModules } from '../usedMaterialModules';
import { JustDatePipe } from '../just-date.pipe';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { By } from '@angular/platform-browser';
import { SetAuthor } from '../actions/filter.actions';
import { samplePhoto } from '../../test-helpers/samplePhoto';


describe('FlickrPhotoComponent', () => {
  let component: FlickrPhotoComponent;
  let fixture: ComponentFixture<FlickrPhotoComponent>;
  const photoUrl = 'https://farm123.staticflickr.com/server/id_secret.jpg';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlickrPhotoComponent, JustDatePipe],
      imports: [...usedMaterialModules, StoreModule.forRoot({...fromRoot.reducers})]
    });
    fixture = TestBed.createComponent(FlickrPhotoComponent);
    component = fixture.componentInstance;
  });

  it('should display a photo', () => {
    component.photo = samplePhoto();
    fixture.detectChanges();

    const a: HTMLLinkElement = fixture.nativeElement.querySelector('a');
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(a.href).toEqual(photoUrl);
    expect(a.target).toEqual('_blank');
    expect(a.children).toContain(img);
    expect(img.src).toEqual(photoUrl);
  });

  it('should display photo details', () => {
    component.photo = samplePhoto();
    fixture.detectChanges();

    const title: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');
    const authorLabel: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle.link');
    const dateLabel: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle:not(.link)');

    expect(title.textContent).toEqual(samplePhoto().title);
    expect(authorLabel.textContent).toEqual(samplePhoto().ownername);
    expect(dateLabel.textContent).toEqual('Thu Nov 01 2018');
  });

  it('should dispatch SetAuthor when author label is clicked', () => {
    component.photo = samplePhoto();
    fixture.detectChanges();
    const authorLabelDebug = fixture.debugElement.query(By.css('mat-card-subtitle.link'));
    const expectedAction = new SetAuthor({
      id: samplePhoto().owner,
      name: samplePhoto().ownername
    });

    const store = TestBed.get(Store);
    spyOn(store, 'dispatch');

    authorLabelDebug.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
