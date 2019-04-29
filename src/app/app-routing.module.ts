import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracksComponent } from './components/tracks/tracks/tracks.component';

const routes: Routes = [
  { path: 'provas', component: TracksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
