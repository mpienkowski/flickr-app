import { AppConfig } from '../models/appConfig.model';
import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const appConfig: AppConfig = {
  flickrApiKey: 'b379f45039739c052e3c3f868026393a'
};
