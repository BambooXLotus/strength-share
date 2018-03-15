import { LiftInput } from './../input/lift-input/lift-input.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  inputs: LiftInput[] = new Array<LiftInput>();

  exercises = [
    { value: 'squat', viewValue: 'Squat' },
    { value: 'bench', viewValue: 'Bench' },
    { value: 'deadlift', viewValue: 'Deadlift' }
  ];

  constructor() {}

  ngOnInit() {
    this.inputs.push(new LiftInput(0, 0, 0, 0));
  }

  addLift() {
    this.inputs.push(new LiftInput(0, 0, 0, 0));
  }
}
