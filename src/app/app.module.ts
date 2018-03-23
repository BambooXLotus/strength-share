import { CalcService } from './services/calc/calc.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { LiftInputComponent } from './input/lift-input/lift-input.component';
import { TrainingComponent } from './training/training.component';
import { ExerciseComponent } from './training/exercise/exercise.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, InputComponent, LiftInputComponent, TrainingComponent, ExerciseComponent, ProfileComponent],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CalcService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
