import { TestBed } from '@angular/core/testing';

import { FlickrApiService } from './flickr-api.service';

describe('FlickrApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlickrApiService = TestBed.get(FlickrApiService);
    expect(service).toBeTruthy();
  });
});
