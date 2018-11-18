import { Component, OnInit, OnDestroy } from '@angular/core';
import { RootState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { LatLngBounds } from '@agm/core';
import { SetBbox } from '../actions/filter.actions';
import { selectAllMapPhotos, selectIsFetching } from '../selectors/map-photo.selectors';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-photo-map',
  templateUrl: './photo-map.component.html',
  styleUrls: ['./photo-map.component.scss']
})
export class PhotoMapComponent implements OnInit, OnDestroy {
  public photos: Observable<Photo[]>;
  public currentPosition: Promise<Position>;
  private isFetching: Observable<boolean>;
  private isDetailsWindowOpen: boolean;

  constructor(private store: Store<RootState>,
              private geolocationService: GeolocationService) {
  }

  public ngOnInit() {
    this.photos = this.store.pipe(select(selectAllMapPhotos));
    this.isFetching = this.store.pipe(select(selectIsFetching));
    this.currentPosition = this.geolocationService.getCurrentPosition();
  }

  public onBoundsChange(bounds: LatLngBounds) {
    if (!this.isDetailsWindowOpen) {
      this.store.dispatch(new SetBbox(bounds));
    }
  }

  public onDetailsOpenChange(isOpen: boolean) {
    this.isDetailsWindowOpen = isOpen;
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new SetBbox(null));
  }
}
