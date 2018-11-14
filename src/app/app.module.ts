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
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { MessageEffects } from './effects/message.effects';
import { JustDatePipe } from './just-date.pipe';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { LicenseEffects } from './effects/license.effects';

@NgModule({
  declarations: [
    AppComponent,
    PhotosGridComponent,
    FlickrPhotoComponent,
    JustDatePipe,
    FilterComponent
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
    EffectsModule.forRoot([AppEffects, PhotosEffects, MessageEffects, LicenseEffects]),
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
