import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { AddPhotos, ClearPhotos, FetchFailed, FetchNextPageOfPhotos, PhotoActionTypes } from '../actions/photo.actions';
import { FlickrApiService } from '../flickr-api.service';
import { RootState } from '../reducers';
import { selectLoadedPages } from '../selectors/photo.selectors';
import { ErrorMessage } from '../actions/message.actions';
import { FilterActionTypes } from '../actions/filter.actions';
import { selectFilter } from '../selectors/filter.selectors';


@Injectable()
export class PhotosEffects {

  @Effect()
  public fetchNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchNextPageOfPhotos),
    withLatestFrom(this.store.pipe(select(selectLoadedPages))),
    withLatestFrom(this.store.pipe(select(selectFilter))),
    switchMap(([[, loadedPages], filter]) =>
      this.flickrApiService.searchPhotos(loadedPages + 1, filter).pipe(
        map(photos => new AddPhotos({photos})),
        catchError(() => of(new FetchFailed()))
      )
    )
  );

  @Effect()
  public filterChanges$: Observable<Action> = this.actions$.pipe(
    ofType(FilterActionTypes.SetText, FilterActionTypes.SetLicenses),
    switchMap(() => [
      new ClearPhotos(),
      new FetchNextPageOfPhotos()
    ])
  );

  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchFailed),
    map(() => new ErrorMessage('Fetching error, please try again', new FetchNextPageOfPhotos()))
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService,
              private store: Store<RootState>) {
  }
}
