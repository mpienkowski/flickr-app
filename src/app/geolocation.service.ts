import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {
  }

  public getCurrentPosition(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      try {
        window.navigator.geolocation.getCurrentPosition(resolve, reject);
      } catch {
        reject('Geolocation not available');
      }
    });
  }
}
