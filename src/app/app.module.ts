import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatExpansionModule } from '@angular/material';
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
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { TrainingDayAddComponent } from './training-plan/training-week/training-day/training-day-add/training-day-add.component';
import { TrainingDayComponent } from './training-plan/training-week/training-day/training-day.component';
import { TrainingWorkLoadComponent } from './training-plan/training-week/training-day/training-work/training-work-load/training-work-load.component';
import { TrainingWorkComponent } from './training-plan/training-week/training-day/training-work/training-work.component';
import { TrainingWeekComponent } from './training-plan/training-week/training-week.component';
import { TrainingWorkAddComponent } from './training-work-add/training-work-add.component';
import { ExerciseComponent } from './training/exercise/exercise.component';
import { TrainingComponent } from './training/training.component';
import { SortableDirective } from './shared/sortable.directive';

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
    TrainingDayAddComponent,
    TrainingWorkLoadComponent,
    TrainingWorkAddComponent,
    SortableDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    MatDialogModule,
    MatExpansionModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  entryComponents: [TrainingDayAddComponent, TrainingWorkAddComponent],
  providers: [CalcService, FirebaseService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
