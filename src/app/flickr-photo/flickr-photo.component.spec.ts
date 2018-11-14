import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrPhotoComponent } from './flickr-photo.component';

describe('FlickrPhotoComponent', () => {
  let component: FlickrPhotoComponent;
  let fixture: ComponentFixture<FlickrPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlickrPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
