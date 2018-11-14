import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';
import { ClearPhotos, FetchNextPageOfPhotos } from '../actions/photo.actions';
import { Photo } from '../models/photo.model';
import { Observable } from 'rxjs';
import { selectAllPhotos } from '../selectors/photo.selectors';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html',
  styleUrls: ['./photos-grid.component.scss']
})
export class PhotosGridComponent implements OnInit {
  public photos: Observable<Photo[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(new ClearPhotos());
    this.store.dispatch(new FetchNextPageOfPhotos());

    this.photos = this.store.pipe(select(selectAllPhotos));
  }
}
