import { Component, OnInit } from '@angular/core';
import { RootState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { LatLngBounds } from '@agm/core';
import { SetBbox } from '../actions/filter.actions';
import { selectAllMapPhotos, selectIsFetching } from '../selectors/map-photo.selectors';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-photo-map',
  templateUrl: './photo-map.component.html',
  styleUrls: ['./photo-map.component.scss']
})
export class PhotoMapComponent implements OnInit {
  private photos: Observable<Photo[]>;
  private isFetching: Observable<boolean>;
  private isDetailsWindowOpen: boolean;

  constructor(private store: Store<RootState>) {
  }

  public ngOnInit() {
    this.photos = this.store.pipe(select(selectAllMapPhotos));
    this.isFetching = this.store.pipe(select(selectIsFetching));
  }

  public onBoundsChange(bounds: LatLngBounds) {
    if (!this.isDetailsWindowOpen) {
      this.store.dispatch(new SetBbox(bounds));
    }
  }

  public onDetailsOpenChange(isOpen: boolean) {
    this.isDetailsWindowOpen = isOpen;
  }
}
