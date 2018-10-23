import { Profile } from './../profile/profile.model';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingPlan } from './training-plan.model';
import { TrainingWeek } from './training-week/training-week.model';

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
    this.currentTraining = this.fbService.getTrainingPlan('bambooderen', this.trainingPlanId);
  }
}
