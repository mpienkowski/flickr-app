import { Component, Input } from '@angular/core';
import { Photo } from '../models/photo.model';
import { RootState } from '../reducers';
import { Store } from '@ngrx/store';
import { SetAuthor } from '../actions/filter.actions';

@Component({
  selector: 'app-flickr-photo',
  templateUrl: './flickr-photo.component.html',
  styleUrls: ['./flickr-photo.component.scss']
})
export class FlickrPhotoComponent {
  @Input() public photo: Photo;
  public readonly titleLengthLimit = 21;

  constructor(private store: Store<RootState>) {
  }

  public onAuthorClick() {
    this.store.dispatch(new SetAuthor({
      id: this.photo.owner,
      name: this.photo.ownername
    }));
  }
}
