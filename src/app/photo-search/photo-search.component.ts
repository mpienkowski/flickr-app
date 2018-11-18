import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearPhotos, FetchNextPageOfPhotos } from '../actions/photo.actions';
import { RootState } from '../reducers';
import { Photo } from '../models/photo.model';
import { Observable, Subscription } from 'rxjs';
import { selectAllPhotos, selectIsLoading } from '../selectors/photo.selectors';
import { selectFilter } from '../selectors/filter.selectors';

@Component({
  selector: 'app-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.scss']
})
export class PhotoSearchComponent implements OnInit, OnDestroy {
  public photos: Photo[];
  public isLoading: Observable<boolean>;
  public showGrid: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<RootState>) {
  }

  public ngOnInit() {
    this.store.dispatch(new ClearPhotos());
    this.store.dispatch(new FetchNextPageOfPhotos());

    this.subscriptions.add(this.store.pipe(select(selectAllPhotos)).subscribe((photos) => {
      this.photos = photos;
      this.showGrid = true;
    }));

    this.subscriptions.add(this.store.pipe(select(selectFilter)).subscribe(() => this.showGrid = false));

    this.isLoading = this.store.pipe(select(selectIsLoading));
  }

  public onScroll() {
    this.store.dispatch(new FetchNextPageOfPhotos());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
