import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExerciseInput } from './exercise.model';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() input: ExerciseInput;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  calcLoad() {}

  onRemove() {
    this.remove.emit(null);
  }
}
