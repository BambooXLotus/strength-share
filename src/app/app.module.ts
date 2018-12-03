import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from './../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './firebase.service';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { LiftInputComponent } from './input/lift-input/lift-input.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { MuscleGroupAddComponent } from './muscle-group/muscle-group-add/muscle-group-add.component';
import { MuscleGroupComponent } from './muscle-group/muscle-group.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileComponent } from './profile/profile.component';
import { CalcService } from './services/calc/calc.service';
import { SortableDirective } from './shared/sortable.directive';
import { TrainingDayAddComponent } from './training-plan/training-day/training-day-add/training-day-add.component';
import { TrainingDayComponent } from './training-plan/training-day/training-day.component';
import { TrainingPlanComponent } from './training-plan/training-plan.component';
import { TrainingWeekComponent } from './training-plan/training-week/training-week.component';
import { TrainingWorkAddComponent } from './training-plan/training-work/training-work-add/training-work-add.component';
import { TrainingWorkComponent } from './training-plan/training-work/training-work.component';
import { TrainingWorksSortComponent } from './training-works-sort/training-works-sort.component';
import { ExerciseComponent } from './training/exercise/exercise.component';
import { TrainingComponent } from './training/training.component';
import { WorkLoadResultComponent } from './work-load-result/work-load-result.component';

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
    TrainingWorkAddComponent,
    SortableDirective,
    ProfileListComponent,
    TrainingWorksSortComponent,
    WorkLoadResultComponent,
    AdminComponent,
    MuscleGroupComponent,
    MuscleGroupAddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    DragDropModule
  ],
  entryComponents: [
    TrainingDayAddComponent,
    TrainingWorkAddComponent,
    TrainingWorksSortComponent,
    WorkLoadResultComponent,
    MuscleGroupAddComponent
  ],
  providers: [CalcService, FirebaseService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
