import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AddLicenses, FetchFailed, FetchLicenses, LicenseActionTypes } from '../actions/license.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { FlickrApiService } from '../flickr-api.service';
import { ErrorMessage } from '../actions/message.actions';


@Injectable()
export class LicenseEffects {
  @Effect()
  public fetchLicenses$: Observable<Action> = this.actions$.pipe(
    ofType(LicenseActionTypes.FetchLicenses),
    mergeMap(() => this.flickrApiService.fetchLicenses()),
    map(licenses => new AddLicenses({licenses})),
    catchError(() => of(new FetchFailed()))
  );

  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(LicenseActionTypes.FetchFailed),
    map(() => new ErrorMessage(`Couldn't fetch licenses, please try again`, new FetchLicenses()))
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService) {
  }
}
