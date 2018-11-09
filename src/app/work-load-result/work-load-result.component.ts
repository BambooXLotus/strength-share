import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { TrainingWorkLoad } from '../training-plan/training-week/training-day/training-work/training-work-load/training-work-load.model';

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
