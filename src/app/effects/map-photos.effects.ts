import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { selectFilter } from '../selectors/filter.selectors';
import { Action, select, Store } from '@ngrx/store';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ErrorMessage } from '../actions/message.actions';
import { AddMapPhotos, FetchFailed, FetchMapPhotos, LoadMapPhotos, MapPhotoActionTypes } from '../actions/map-photo.actions';
import { FlickrApiService } from '../flickr-api.service';
import { RootState } from '../reducers';
import { FilterActionTypes } from '../actions/filter.actions';


@Injectable()
export class MapPhotosEffects {
  private readonly filterChangeActions = [
    FilterActionTypes.SetText,
    FilterActionTypes.SetLicenses,
    FilterActionTypes.SetMinDate,
    FilterActionTypes.SetMaxDate,
    FilterActionTypes.SetBbox
  ];

  @Effect()
  public fetchNextPage$: Observable<Action> = this.actions$.pipe(
    ofType(MapPhotoActionTypes.FetchMapPhotos, ...this.filterChangeActions),
    withLatestFrom(this.store.pipe(select(selectFilter))),
    switchMap(([, filter]) =>
      this.flickrApiService.searchPhotos(0, filter).pipe(
        map(photos => new LoadMapPhotos({mapPhotos: photos})),
        catchError(() => of(new FetchFailed()))
      )
    )
  );
  @Effect()
  public handleErrors$: Observable<Action> = this.actions$.pipe(
    ofType(MapPhotoActionTypes.FetchFailed),
    map(() => new ErrorMessage(`Couldn't fetch photos, please try again`, new FetchMapPhotos()))
  );

  constructor(private actions$: Actions,
              private flickrApiService: FlickrApiService,
              private store: Store<RootState>) {
  }
}
