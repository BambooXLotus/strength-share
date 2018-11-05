import { CalcService } from './../services/calc/calc.service';
import { ProfileService } from './../profile/profile.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { TrainingWork } from '../training-plan/training-week/training-day/training-work/training-work.model';
import { CalcLoadInput1 } from '../services/calc/calc-load-input.model';
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
      value: this.profileService.currentUserProfile().benchMax,
      valueView: 'Bench - ' + this.profileService.currentUserProfile().benchMax
    };

    const sqOption = {
      value: this.profileService.currentUserProfile().squatMax,
      valueView: 'Squat - ' + this.profileService.currentUserProfile().squatMax
    };

    const dlOption = {
      value: this.profileService.currentUserProfile().deadliftMax,
      valueView: 'Deadlift - ' + this.profileService.currentUserProfile().deadliftMax
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
}
