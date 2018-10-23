import { FirebaseService } from './../../../../firebase.service';
import { TrainingWork } from './training-work.model';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-work',
  templateUrl: './training-work.component.html',
  styleUrls: ['./training-work.component.css']
})
export class TrainingWorkComponent implements OnInit {
  @Input()
  trainingDayId: string;
  trainingWorks: Observable<TrainingWork[]> | null = null;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    this.trainingWorks = this.fbService.getTrainingWorks(this.trainingDayId);
  }
}
