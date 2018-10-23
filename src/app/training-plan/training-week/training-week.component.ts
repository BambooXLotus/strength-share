import { TrainingWeek } from './training-week.model';
import { Observable } from 'rxjs';
import { FirebaseService } from './../../firebase.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-week',
  templateUrl: './training-week.component.html',
  styleUrls: ['./training-week.component.css']
})
export class TrainingWeekComponent implements OnInit {
  @Input()
  trainingPlanId: string;
  trainingWeeks: Observable<TrainingWeek[]> | null = null;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    this.trainingWeeks = this.fbService.getTrainingWeeks(this.trainingPlanId);
  }
}
