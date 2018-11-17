import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoSearchComponent } from './photo-search/photo-search.component';
import { PhotoMapComponent } from './photo-map/photo-map.component';

const routes: Routes = [
  {path: 'search', component: PhotoSearchComponent},
  {path: 'map', component: PhotoMapComponent},
  {path: '**', redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
