import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TrainingWorkLoad } from '../training-work-load/training-work-load.model';
import { TrainingWork } from '../training-work/training-work.model';
import { FirebaseService } from './../../firebase.service';
import { WorkLoadResultDialogService } from './../../work-load-result/work-load-result-dialog.service';
import { TrainingWorkDialogService } from './../training-work/training-work-dialog.service';
import { TrainingDay } from './training-day.model';

@Component({
  selector: 'app-training-day',
  templateUrl: './training-day.component.html',
  styleUrls: ['./training-day.component.css']
})
export class TrainingDayComponent implements OnInit {
  trainingDay: Observable<TrainingDay> | null = null;

  constructor(
    private route: ActivatedRoute,
    private fbService: FirebaseService,
    private resultDialog: WorkLoadResultDialogService,
    private workDialog: TrainingWorkDialogService
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    const id = this.route.snapshot.paramMap.get('dayid');

    this.fbService.getProfile(username).subscribe((s) => {
      this.trainingDay = this.fbService.getTrainingDayDeep(id);
    });
  }

  openSortWorkDialog(works: TrainingWork[]): void {
    this.workDialog.openSort(works);
  }

  openWorkResultDialog(work: TrainingWork, load: TrainingWorkLoad): void {
    this.resultDialog.Open(work, load);
  }
}
