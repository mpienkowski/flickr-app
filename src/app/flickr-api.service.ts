import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './models/photo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from './reducers/filter.reducer';

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
        'text': filter.text
      }
    };
    return this.http.get<{ photos: { photo: Photo[] } }>(url, options).pipe(
      map(response => response.photos.photo)
    );
  }
}
