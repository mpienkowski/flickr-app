import { of } from 'rxjs';
import { sampleListOfPhotos } from './sample-photo';

export const flickrApiMockService = {
  searchPhotos: () => of(sampleListOfPhotos())
};
