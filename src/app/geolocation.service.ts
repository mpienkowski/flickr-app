import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private window: Window) {
  }

  public getCurrentPosition(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      try {
        this.window.navigator.geolocation.getCurrentPosition(resolve, reject);
      } catch {
        reject('Geolocation not available');
      }
    });
  }
}
