import { samplePosition } from './sample-position';

export const geolocationMockService = {
  getCurrentPosition(): Promise<Position> {
    return Promise.resolve(samplePosition());
  }
};
