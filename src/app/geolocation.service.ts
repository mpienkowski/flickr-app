import { Injectable } from '@angular/core';
import { WindowWrapper } from './WindowWrapper';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private window: WindowWrapper) {
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
