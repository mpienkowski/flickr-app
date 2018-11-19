import { Photo } from '../app/models/photo.model';
import { Component, Input } from '@angular/core';

@Component({selector: 'app-flickr-photo', template: ''})
export class FlickrPhotoMockComponent {
  @Input() photo: Photo;
}
