import { FirebaseService } from './../../../firebase.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MuscleGroup } from './../../../muscle-group/muscle-group.model';
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: MuscleGroup[] = [];
  allMuscleGroups: Observable<MuscleGroup[]> | null = null;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<TrainingWorkAddComponent>,
    private profileService: ProfileService,
    private calcService: CalcService,
    private fbService: FirebaseService,
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

    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice()))
    // );

    this.allMuscleGroups = this.fbService.getMuscleGroups();
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

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    // if (!this.matAutocomplete.isOpen) {
    //   const input = event.input;
    //   const value = event.value;
    //   // Add our fruit
    //   if ((value || '').trim()) {
    //     this.fruits.push(value);
    //   }
    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    //   this.fruitCtrl.setValue(null);
    // }
  }

  remove(fruit: string): void {
    // const index = this.fruits.indexOf(fruit);
    // if (index >= 0) {
    //   this.fruits.splice(index, 1);
    // }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    // this.fruitCtrl.setValue(null);
  }

  //   private _filter(value: string): string[] {
  //     const filterValue = value.toLowerCase();

  //     return this.allMuscleGroups.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  //   }
}
