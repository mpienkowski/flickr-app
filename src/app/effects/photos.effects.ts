import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { AddPhotos, FetchFailed, FetchNextPageOfPhotos, PhotoActionTypes } from '../actions/photo.actions';
import { FlickrApiService } from '../flickr-api.service';
import { State } from '../reducers';
import { selectLoadedPages } from '../selectors/photo.selectors';
import { ErrorMessage } from '../actions/message.actions';


@Injectable()
export class PhotosEffects {

  @Effect()
  public fetchNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchNextPageOfPhotos),
    withLatestFrom(this.store.pipe(select(selectLoadedPages))),
    mergeMap(([, loadedPages]) => {
      return this.flickrApiService.searchPhotos(loadedPages + 1).pipe(
        map(photos => new AddPhotos({photos})),
        catchError(() => of(new FetchFailed()))
      );
    })
  );

  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchFailed),
    map(() => new ErrorMessage('Fetching error, please try again', new FetchNextPageOfPhotos()))
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService,
              private store: Store<State>) {
  }
}
