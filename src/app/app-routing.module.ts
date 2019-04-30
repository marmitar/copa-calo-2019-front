import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '$/dashboard/dashboard.component';
import { CreateAthleteComponent } from '$/athletes/create-athlete/create-athlete.component';
import { RegisterAthleteComponent } from '$/athletes/register-athlete/register-athlete.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'atleta', component: CreateAthleteComponent },
  { path: 'inscricao', component: RegisterAthleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
