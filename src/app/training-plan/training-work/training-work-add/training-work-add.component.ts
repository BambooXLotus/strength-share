import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ProfileService } from './../../../profile/profile.service';
import { CalcLoadInput1 } from './../../../services/calc/calc-load-input.model';
import { CalcService } from './../../../services/calc/calc.service';
import { TrainingWorkAdd } from './training-work-add.model';

export interface LiftOption {
  value: number;
  valueView: string;
}

@Component({
  selector: 'app-training-work-add',
  templateUrl: './training-work-add.component.html',
  styleUrls: ['./training-work-add.component.css']
})
export class TrainingWorkAddComponent implements OnInit {
  liftOptions: LiftOption[] = [];
  selectedLift: 0;

  constructor(
    public dialogRef: MatDialogRef<TrainingWorkAddComponent>,
    private profileService: ProfileService,
    private calcService: CalcService,
    @Inject(MAT_DIALOG_DATA) public data: TrainingWorkAdd
  ) {}

  ngOnInit() {
    const bnOption = {
      value: this.data.benchMax,
      valueView: 'Bench - ' + this.data.benchMax
    };

    const sqOption = {
      value: this.data.squatMax,
      valueView: 'Squat - ' + this.data.squatMax
    };

    const dlOption = {
      value: this.data.deadliftMax,
      valueView: 'Deadlift - ' + this.data.deadliftMax
    };

    this.liftOptions = [bnOption, sqOption, dlOption];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calc() {
    console.log('Calcing');
    let returnValue = 0;

    if (this.selectedLift) {
      const load = this.calcService.calcLoadV1(
        new CalcLoadInput1(this.data.trainingWork.rpe, this.data.trainingWork.reps, this.selectedLift),
        this.data.trainingWork.mod
      );

      returnValue = load;
    }

    console.log(returnValue);

    this.data.trainingWorkLoad.loadDisplay = returnValue + '';
    this.data.trainingWorkLoad.load = returnValue;
  }

  repsChanged() {
    this.data.trainingWork.repsDisplay = this.data.trainingWork.reps + '-' + (this.data.trainingWork.reps + 2);
  }

  setsChanged() {
    this.data.trainingWork.setsDisplay = this.data.trainingWork.sets + '';
  }
}
