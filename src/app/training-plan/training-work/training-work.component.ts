import { CalcLoadInput1 } from './../../services/calc/calc-load-input.model';
import { FirebaseService } from './../../firebase.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingWorkLoad } from '../training-work-load/training-work-load.model';
import { ProfileService } from './../../profile/profile.service';
import { CalcService } from './../../services/calc/calc.service';
import { TrainingWork } from './training-work.model';

@Component({
  selector: 'app-training-work',
  templateUrl: './training-work.component.html',
  styleUrls: ['./training-work.component.css']
})
export class TrainingWorkComponent implements OnInit {
  @Input()
  trainingDayId: string;
  trainingWorks: Observable<TrainingWork[]> | null = null;

  constructor(
    private fbService: FirebaseService,
    private profileService: ProfileService,
    private calcService: CalcService
  ) {}

  ngOnInit() {
    this.trainingWorks = this.fbService.getTrainingWorks(this.trainingDayId);
  }

  calcWeight(trainingWork: TrainingWork) {
    const load = this.calcService.calcLoadV1(
      new CalcLoadInput1(trainingWork.rpe, trainingWork.reps, this.profileService.currentUserProfile().benchMax)
    );

    const trainingLoad = new TrainingWorkLoad(load, load.toString());

    this.fbService.setTrainingWorkWeight(trainingWork.id, trainingLoad).subscribe();
  }
}
