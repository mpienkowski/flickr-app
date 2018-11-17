import { Component, OnInit } from '@angular/core';
import { RootState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { FetchMapPhotos } from '../actions/map-photo.actions';
import { LatLngBounds } from '@agm/core';
import { SetBbox } from '../actions/filter.actions';
import { selectAllMapPhotos } from '../selectors/map-photo.selectors';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-photo-map',
  templateUrl: './photo-map.component.html',
  styleUrls: ['./photo-map.component.scss']
})
export class PhotoMapComponent implements OnInit {
  private photos: Observable<Photo[]>;

  constructor(private store: Store<RootState>) { }

  public ngOnInit() {
    this.store.dispatch(new FetchMapPhotos());

    this.photos = this.store.pipe(select(selectAllMapPhotos));
  }

  public onBoundsChange(bounds: LatLngBounds) {
    this.store.dispatch(new SetBbox(bounds));
  }
}
