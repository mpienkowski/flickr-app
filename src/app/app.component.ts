import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'flickr-app';

  constructor(private http: HttpClient) {
  }

  public clickHandler() {
    this.http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=501c4bfb0a4b3182a26366575a8f0bf7&format=json&nojsoncallback=1&auth_token=72157700315945542-048e387fb24795f0&api_sig=550373c4fe8ed767f2426253b8137e06')
      .toPromise()
      .then(r => console.log('result', r))
      .catch(e => console.log('error', e));
  }
}
