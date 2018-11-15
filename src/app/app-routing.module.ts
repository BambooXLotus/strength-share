import { ProfileListComponent } from './profile-list/profile-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TrainingDayComponent } from './training-plan/training-week/training-day/training-day.component';

const routes: Routes = [
  //   { path: 'profiles', component: ProfileComponent },
  { path: 'p', component: ProfileComponent, pathMatch: 'full' },
  { path: 'p/:username/d/:dayid', component: TrainingDayComponent },
  { path: 'p/:username', component: ProfileComponent },
  { path: '', component: ProfileListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
