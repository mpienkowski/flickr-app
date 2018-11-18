import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { interval, Observable, of } from 'rxjs';
import { catchError, debounce, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { AddPhotos, ClearPhotos, FetchFailed, FetchNextPageOfPhotos, LoadPhotos, PhotoActionTypes } from '../actions/photo.actions';
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
    filter(([[, loadedPages], currentFilter]) => !currentFilter.bbox),
    switchMap(([[, loadedPages], currentFilter]) => this.flickrApiService.searchPhotos(loadedPages + 1, currentFilter)),
    map(photos => new AddPhotos({photos})),
    catchError(() => of(new FetchFailed()))
  );
  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoActionTypes.FetchFailed),
    map(() => new ErrorMessage(`Couldn't fetch photos, please try again`, new FetchNextPageOfPhotos()))
  );
  private readonly filterChangeActions = [
    FilterActionTypes.SetText,
    FilterActionTypes.SetLicenses,
    FilterActionTypes.SetMinDate,
    FilterActionTypes.SetMaxDate,
    FilterActionTypes.SetAuthor
  ];
  @Effect()
  public filterChanges$: Observable<Action> = this.actions$.pipe(
    ofType(...this.filterChangeActions),
    debounce(() => interval(250)),
    switchMap(() => [
      new ClearPhotos(),
      new FetchNextPageOfPhotos()
    ])
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService,
              private store: Store<RootState>) {
  }
}
