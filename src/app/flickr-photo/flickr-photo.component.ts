import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-flickr-photo',
  templateUrl: './flickr-photo.component.html',
  styleUrls: ['./flickr-photo.component.scss']
})
export class FlickrPhotoComponent implements OnInit {
  @Input() public photo: Photo;
  public readonly titleLengthLimit = 21;

  constructor() {
  }

  ngOnInit() {
  }
}
