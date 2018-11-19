import { Photo } from '../app/models/photo.model';

export const samplePhoto = (id?: string): Photo => ({
  id: id ? id : 'id',
  title: 'title',
  owner: 'owner',
  ownername: 'owner name',
  datetaken: '2018-11-01 12:50:43',
  farm: '123',
  secret: 'secret',
  server: 'server'
});

export const sampleListOfPhotos = (): Photo[] => ([samplePhoto('1'), samplePhoto('2'), samplePhoto('3')]);
