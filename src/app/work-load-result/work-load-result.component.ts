import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TrainingWorkLoad } from '../training-plan/training-work-load/training-work-load.model';

@Component({
  selector: 'app-work-load-result',
  templateUrl: './work-load-result.component.html',
  styleUrls: ['./work-load-result.component.css']
})
export class WorkLoadResultComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WorkLoadResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingWorkLoad
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
