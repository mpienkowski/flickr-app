import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { FlickrApiService } from './flickr-api.service';
import { APP_CONFIG } from './config/app.config';
import { License } from './models/license.model';
import { Photo } from './models/photo.model';
import { State as Filter } from './reducers/filter.reducer';
import { sampleBbox } from '../test-helpers/sample-bbox';


describe('FlickrApiService', () => {
  let service: FlickrApiService;
  let httpClient, httpTestingController;
  const apiKey = 'apiKey';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: APP_CONFIG, useValue: {flickrApiKey: apiKey}}
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FlickrApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch licenses', () => {
    const expectedLicenses: License[] = [{id: '1', name: 'license 1'}, {id: '2', name: 'license 2'}];
    service.fetchLicenses().subscribe(response => expect(response).toEqual(expectedLicenses));

    // tslint:disable-next-line:max-line-length
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.licenses.getInfo&api_key=${apiKey}&format=json&nojsoncallback=1`;
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');
    req.flush({licenses: {license: expectedLicenses}});
  });

  it('should search for licenses', () => {
    const expectedPhotos: Photo[] = [
      {id: '1', owner: '123', title: 'photo 1'} as Photo,
      {id: '2', owner: '456', title: 'photo 2'} as Photo
    ];
    const getFilter = (): Filter => ({
      text: 'text',
      bbox: <any>sampleBbox(),
      minDate: new Date('Nov 17 2018'),
      maxDate: new Date('Nov 18 2018'),
      author: {id: '1', name: 'author'},
      licenses: ['CC', 'Copyrighted']
    });
    const pageToFetch = 5;

    service.searchPhotos(pageToFetch, getFilter()).subscribe(response => expect(response).toEqual(expectedPhotos));

    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1`;

    const req = httpTestingController.expectOne((r) => {
      return r.url === url
        && r.params.get('page') === pageToFetch.toString()
        && r.params.get('text') === getFilter().text
        && r.params.get('bbox') === '1,2,3,4'
        && r.params.get('min_taken_date') === '1542409200'
        && r.params.get('max_taken_date') === '1542495600'
        && r.params.get('user_id') === getFilter().author.id
        && r.params.get('license') === 'CC,Copyrighted';
    });

    expect(req.request.method).toEqual('GET');
    req.flush({photos: {photo: expectedPhotos}});
  });
});
