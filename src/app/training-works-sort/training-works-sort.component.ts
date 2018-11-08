import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TrainingWork } from '../training-plan/training-week/training-day/training-work/training-work.model';

@Component({
  selector: 'app-training-works-sort',
  templateUrl: './training-works-sort.component.html',
  styleUrls: ['./training-works-sort.component.css']
})
export class TrainingWorksSortComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<TrainingWorksSortComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingWork[]
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    //   this.data.un
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDrop(event: CdkDragDrop<TrainingWork[]>) {
    console.log(event);
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
