import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './models/photo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State as Filter } from './reducers/filter.reducer';
import { License } from './models/license.model';
import { AppConfig } from './models/appConfig.model';
import { APP_CONFIG } from './config/app.config';
import { LatLngBounds } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig,
              private http: HttpClient) {
  }

  public searchPhotos(loadedPages: number, filter: Filter): Observable<Photo[]> {
    const url = this.getUrl('flickr.photos.search');
    const options = {
      params: {
        page: loadedPages.toString(),
        extras: 'description,owner_name,date_taken,geo',
        text: filter.text,
        license: filter.licenses.join(','),
        min_taken_date: this.getTimestamp(filter.minDate),
        max_taken_date: this.getTimestamp(filter.maxDate),
        bbox: this.bboxToString(filter.bbox)
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

  private getTimestamp(date: Date): string {
    return date ? (Math.round(date.getTime() / 1000)).toString() : '';
  }

  private bboxToString(bbox: LatLngBounds): string {
    if (!bbox) {
      return '';
    }
    const sw = bbox.getSouthWest();
    const ne = bbox.getNorthEast();
    return `${sw.lng()},${sw.lat()},${ne.lng()},${ne.lat()}`;
  }
}
