import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TrainingDay } from '../training-day.model';

@Component({
  selector: 'app-training-day-add',
  templateUrl: './training-day-add.component.html',
  styleUrls: ['./training-day-add.component.css']
})
export class TrainingDayAddComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TrainingDayAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingDay
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
