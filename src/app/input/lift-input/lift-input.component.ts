import { CalcService } from './../../services/calc/calc.service';
import { Component, Input, OnInit } from '@angular/core';

import { LiftInput } from './lift-input.model';

@Component({
  selector: 'app-lift-input',
  templateUrl: './lift-input.component.html',
  styleUrls: ['./lift-input.component.scss']
})
export class LiftInputComponent implements OnInit {
  @Input() lift: string;
  input: LiftInput = {
    weight: 0,
    reps: 0,
    rpe: 0,
    estimate: 0
  };

  constructor(private calcService: CalcService) {}

  ngOnInit() {}

  calcEstimate(): void {
    this.input.estimate = this.calcService.calc(this.input);
  }
}
