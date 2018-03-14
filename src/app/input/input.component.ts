import { Input } from './input.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  squatInput: Input = {
    weight: 100,
    reps: 1,
    rpe: 10,
    estimate: 100
  };

  constructor() {}

  ngOnInit() {}
}
