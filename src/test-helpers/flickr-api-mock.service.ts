import { of } from 'rxjs';
import { sampleListOfPhotos } from './sample-photo';
import { sampleListOfLicenses } from './sample-license';

export const flickrApiMockService = {
  searchPhotos: () => of(sampleListOfPhotos()),
  fetchLicenses: () => of(sampleListOfLicenses())
};
