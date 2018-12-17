import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { NyeComponent } from './extra/nye/nye.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileComponent } from './profile/profile.component';
import { TrainingDayComponent } from './training-plan/training-day/training-day.component';

const routes: Routes = [
  //   { path: 'profiles', component: ProfileComponent },
  { path: 'p', component: ProfileComponent, pathMatch: 'full' },
  { path: 'p/:username/d/:dayid', component: TrainingDayComponent },
  { path: 'p/:username', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'nye', component: NyeComponent },
  { path: '', component: ProfileListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
