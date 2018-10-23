import { TrainingDay } from './training-day.model';

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { FirebaseService } from './../../../firebase.service';
import { TrainingDayAddComponent } from './training-day-add/training-day-add.component';

@Component({
  selector: 'app-training-day',
  templateUrl: './training-day.component.html',
  styleUrls: ['./training-day.component.css']
})
export class TrainingDayComponent implements OnInit {
  @Input()
  trainingWeekId: string;
  trainingDays: Observable<TrainingDay[]> | null = null;

  constructor(private fbService: FirebaseService, public dialog: MatDialog) {}

  ngOnInit() {
    this.trainingDays = this.fbService.getTrainingDays(this.trainingWeekId);
  }

  openAddDayDialog(dayCount: number): void {
    const dialogRef = this.dialog.open(TrainingDayAddComponent, {
      width: '250px',
      data: new TrainingDay('Day ' + (dayCount + 1), dayCount + 1, this.trainingWeekId)
    });

    dialogRef.afterClosed().subscribe((result: TrainingDay) => {
      console.log('The dialog was closed');
      console.log(result);

      this.fbService.addTrainingDay(result).subscribe((s) => console.log(s));
    });
  }
}
