import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PhotosGridComponent } from './photos-grid/photos-grid.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { PhotosEffects } from './effects/photos.effects';
import { FlickrPhotoComponent } from './flickr-photo/flickr-photo.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { MessageEffects } from './effects/message.effects';
import { JustDatePipe } from './just-date.pipe';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { LicenseEffects } from './effects/license.effects';
import { APP_CONFIG, appConfig } from './config/app.config';
import { PhotoSearchComponent } from './photo-search/photo-search.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PhotoMapComponent } from './photo-map/photo-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MapPhotosEffects } from './effects/map-photos.effects';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PhotosGridComponent,
    FlickrPhotoComponent,
    JustDatePipe,
    FilterComponent,
    PhotoSearchComponent,
    NavigationComponent,
    PhotoMapComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    EffectsModule.forRoot([AppEffects, PhotosEffects, MessageEffects, LicenseEffects, MapPhotosEffects]),
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({apiKey: appConfig.googleMapsApiKey}),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: appConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
