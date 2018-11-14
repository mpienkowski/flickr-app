import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AddPhotos, PhotoActionTypes } from '../actions/photo.actions';
import { ErrorMessage } from '../actions/message.actions';
import { FlickrApiService } from '../flickr-api.service';


@Injectable()
export class PhotosEffects {

  @Effect()
  public fetchNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchNextPageOfPhotos),
    mergeMap(() => {
      return this.flickrApiService.searchPhotos().pipe(
        map(photos => new AddPhotos({photos})),
        catchError(() => of(new ErrorMessage()))
      );
    })
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService) {
  }
}
