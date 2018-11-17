import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './models/photo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from './reducers/filter.reducer';
import { License } from './models/license.model';
import { AppConfig } from './models/appConfig.model';
import { APP_CONFIG } from './config/app.config';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig,
              private http: HttpClient) {
  }

  public searchPhotos(loadedPages: number, filter: State): Observable<Photo[]> {
    const url = this.getUrl('flickr.photos.search');
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
    const url = this.getUrl('flickr.photos.licenses.getInfo');
    return this.http.get<{ licenses: { license: License[] } }>(url).pipe(
      map(response => response.licenses.license)
    );
  }

  private getUrl(method: string) {
    return `https://api.flickr.com/services/rest/?method=${method}&api_key=${this.appConfig.flickrApiKey}&format=json&nojsoncallback=1`;
  }
}
