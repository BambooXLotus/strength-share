import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  //   { path: 'profiles', component: ProfileComponent },
  { path: 'p', component: ProfileComponent, pathMatch: 'full' },
  { path: 'p/:username', component: ProfileComponent },
  { path: '', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
