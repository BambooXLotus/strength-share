import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MuscleGroup } from './../muscle-group.model';

@Component({
  selector: 'app-muscle-group-add',
  templateUrl: './muscle-group-add.component.html',
  styleUrls: ['./muscle-group-add.component.css']
})
export class MuscleGroupAddComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MuscleGroupAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MuscleGroup
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
