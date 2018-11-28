import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { FirebaseService } from './../../../firebase.service';
import { TrainingDay } from './../training-day.model';
import { TrainingDayAddComponent } from './training-day-add.component';

@Injectable({
  providedIn: 'root'
})
export class TrainingDayAddDialogService {
  constructor(private dialog: MatDialog, private firebaseService: FirebaseService, private snackBar: MatSnackBar) {}

  open(trainingPlanWeekId: string, dayCount: number): void {
    const currentDayCount = dayCount + 1;
    const trainingDay = new TrainingDay(currentDayCount, 'Day ' + currentDayCount, trainingPlanWeekId);

    const dialogRef = this.dialog.open(TrainingDayAddComponent, {
      width: '500px',
      data: trainingDay
    });

    dialogRef.afterClosed().subscribe((result: TrainingDay) => {
      if (result) {
        this.firebaseService.addTrainingDay(result).subscribe((s) => {
          this.snackBar.open('Day Added', '', { duration: 3000 });
        });
      }
    });
  }
}
