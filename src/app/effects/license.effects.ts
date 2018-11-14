import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FetchFailed, FetchNextPageOfPhotos, PhotoActionTypes } from '../actions/photo.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AddLicenses, FetchLicenses, LicenseActionTypes } from '../actions/license.actions';
import { FlickrApiService } from '../flickr-api.service';
import { ErrorMessage } from '../actions/message.actions';


@Injectable()
export class LicenseEffects {
  @Effect()
  public fetchNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(LicenseActionTypes.FetchLicenses),
    mergeMap(() =>
      this.flickrApiService.fetchLicenses().pipe(
        map(licenses => new AddLicenses({licenses})),
        catchError(() => of(new FetchFailed()))
      )
    )
  );

  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(LicenseActionTypes.FetchFailed),
    map(() => new ErrorMessage('Fetching error, please try again', new FetchLicenses()))
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService) {
  }
}
