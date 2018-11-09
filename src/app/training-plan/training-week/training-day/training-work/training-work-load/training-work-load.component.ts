// import { Component, Input, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';

// import { FirebaseService } from './../../../../../firebase.service';
// import { TrainingWorkLoad } from './training-work-load.model';

// @Component({
//   selector: 'app-training-work-load',
//   templateUrl: './training-work-load.component.html',
//   styleUrls: ['./training-work-load.component.css']
// })
// export class TrainingWorkLoadComponent implements OnInit {
//   @Input()
//   trainingWorkId: string;

//   trainingLoad: Observable<TrainingWorkLoad> | null = null;a

//   constructor(private fbService: FirebaseService) {}

//   ngOnInit() {
//     this.trainingLoad = this.fbService.getTrainingWorkLoad(this.trainingWorkId);
//   }
// }
