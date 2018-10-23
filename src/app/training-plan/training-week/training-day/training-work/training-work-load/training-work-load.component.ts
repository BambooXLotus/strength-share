import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-work-load',
  templateUrl: './training-work-load.component.html',
  styleUrls: ['./training-work-load.component.css']
})
export class TrainingWorkLoadComponent implements OnInit {
  @Input()
  trainingWorkId: string;

  constructor() {}

  ngOnInit() {}
}
