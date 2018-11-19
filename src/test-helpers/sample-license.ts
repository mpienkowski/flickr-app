import { License } from '../app/models/license.model';

export const sampleLicense = (id?: string): License => ({
  id: id ? id : 'id',
  name: 'license' + id
});

export const sampleListOfLicenses = (): License[] => ([sampleLicense('1'), sampleLicense('2'), sampleLicense('3')]);
