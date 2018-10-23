import { FirebaseService } from './../../../../../firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-work-load',
  templateUrl: './training-work-load.component.html',
  styleUrls: ['./training-work-load.component.css']
})
export class TrainingWorkLoadComponent implements OnInit {
  @Input()
  trainingWorkId: string;

  trainingLoad: Observable<number> | null = null;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    //TODO:
    // this.trainingLoad = this.fbService.getTrainingWorkLoad(this.trainingWorkId);
  }
}
