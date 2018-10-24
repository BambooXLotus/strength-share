import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TrainingWork } from '../training-plan/training-week/training-day/training-work/training-work.model';

@Component({
  selector: 'app-training-work-add',
  templateUrl: './training-work-add.component.html',
  styleUrls: ['./training-work-add.component.css']
})
export class TrainingWorkAddComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TrainingWorkAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingWork
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
