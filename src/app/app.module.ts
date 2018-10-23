import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './firebase.service';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { LiftInputComponent } from './input/lift-input/lift-input.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { CalcService } from './services/calc/calc.service';
import { ExerciseComponent } from './training/exercise/exercise.component';
import { TrainingComponent } from './training/training.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { TrainingWeekComponent } from './training-plan/training-week/training-week.component';
import { TrainingDayComponent } from './training-plan/training-week/training-day/training-day.component';
import { TrainingWorkComponent } from './training-plan/training-week/training-day/training-work/training-work.component';
import { TrainingDayAddComponent } from './training-plan/training-week/training-day/training-day-add/training-day-add.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    InputComponent,
    LiftInputComponent,
    TrainingComponent,
    ExerciseComponent,
    ProfileComponent,
    TrainingPlanComponent,
    TrainingWeekComponent,
    TrainingDayComponent,
    TrainingWorkComponent,
    TrainingDayAddComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  entryComponents: [TrainingDayAddComponent],
  providers: [CalcService, FirebaseService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
