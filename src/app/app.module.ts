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
import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { MessageEffects } from './effects/message.effects';

@NgModule({
  declarations: [
    AppComponent,
    PhotosGridComponent,
    FlickrPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    EffectsModule.forRoot([AppEffects, PhotosEffects, MessageEffects]),
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
