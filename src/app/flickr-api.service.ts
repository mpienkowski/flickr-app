import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './models/photo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from './reducers/filter.reducer';
import { License } from './models/license.model';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {

  constructor(private http: HttpClient) {
  }

  public searchPhotos(loadedPages: number, filter: State): Observable<Photo[]> {
    // tslint:disable-next-line
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f04007aaa6ac8cbbd574ec1339296cbc&format=json&nojsoncallback=1`;
    const options = {
      params: {
        'page': loadedPages.toString(),
        'extras': 'description,owner_name,date_taken',
        'text': filter.text,
        'license': filter.licenses.join(',')
      }
    };
    return this.http.get<{ photos: { photo: Photo[] } }>(url, options).pipe(
      map(response => response.photos.photo)
    );
  }

  public fetchLicenses(): Observable<License[]> {
    // tslint:disable-next-line
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.licenses.getInfo&api_key=8b8b146fa566322f8b61c4cd9a1c0a6d&format=json&nojsoncallback=1`;
    return this.http.get<{ licenses: { license: License[] } }>(url).pipe(
      map(response => response.licenses.license)
    );
  }
}
