import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from '../reducers';
import { ClearPhotos, FetchNextPageOfPhotos } from '../actions/photo.actions';
import { Photo } from '../models/photo.model';
import { Observable, Subscription } from 'rxjs';
import { selectAllPhotos, selectIsLoading } from '../selectors/photo.selectors';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html',
  styleUrls: ['./photos-grid.component.scss']
})
export class PhotosGridComponent implements OnInit {
  public photos: Observable<Photo[]>;
  public isLoading: Observable<boolean>;

  constructor(private store: Store<RootState>) {
  }

  public ngOnInit() {
    this.store.dispatch(new ClearPhotos());
    this.store.dispatch(new FetchNextPageOfPhotos());

    this.photos = this.store.pipe(select(selectAllPhotos));
    this.isLoading = this.store.pipe(select(selectIsLoading));
  }

  public onScroll() {
    this.store.dispatch(new FetchNextPageOfPhotos());
  }
}
