import { ExerciseInput } from './exercise/exercise.model';
import { LiftInput } from './../input/lift-input/lift-input.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  @Input() squat1RM = 420;
  workoutName = 'Beginner Day 1 (Monday)';
  inputs: ExerciseInput[] = new Array<ExerciseInput>();

  exercises = [
    { value: 'squat', viewValue: 'Squat' },
    { value: 'bench', viewValue: 'Bench' },
    { value: 'deadlift', viewValue: 'Deadlift' }
  ];

  constructor() {}

  ngOnInit() {
    this.inputs.push(new ExerciseInput('', 0, 0, 0));
  }

  addLift() {
    if (this.inputs.length < 20) {
      this.inputs.push(new ExerciseInput('', 0, 0, 0));
    }
  }

  removeLift(index: number) {
    console.log(index);
    this.inputs.splice(index, 1);
  }
}
