import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseService } from './../firebase.service';
import { TrainingPlan } from './training-plan.model';

@Component({
  selector: 'app-training-plan',
  templateUrl: './training-plan.component.html',
  styleUrls: ['./training-plan.component.css']
})
export class TrainingPlanComponent implements OnInit {
  @Input()
  trainingPlanId: string;

  currentTraining: Observable<TrainingPlan> | null = null;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    this.currentTraining = this.fbService.getTrainingPlan(this.trainingPlanId);
  }
}
