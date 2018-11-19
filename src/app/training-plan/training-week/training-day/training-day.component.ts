import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FirebaseService } from './../../../firebase.service';
import { TrainingWorksSortComponent } from './../../../training-works-sort/training-works-sort.component';
import { WorkLoadResultComponent } from './../../../work-load-result/work-load-result.component';
import { TrainingDay } from './training-day.model';
import { TrainingWorkLoad } from './training-work/training-work-load/training-work-load.model';
import { TrainingWork } from './training-work/training-work.model';

@Component({
  selector: 'app-training-day',
  templateUrl: './training-day.component.html',
  styleUrls: ['./training-day.component.css']
})
export class TrainingDayComponent implements OnInit {
  trainingDay: Observable<TrainingDay> | null = null;

  constructor(private route: ActivatedRoute, private fbService: FirebaseService, public dialog: MatDialog) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    const id = this.route.snapshot.paramMap.get('dayid');

    console.log(id);

    this.fbService.getProfile(username).subscribe((s) => {
      this.trainingDay = this.fbService.getTrainingDayDeep(id);
    });
  }

  openSortWorkDialog(works: TrainingWork[]): void {
    console.log(works);
    const dialogRef = this.dialog.open(TrainingWorksSortComponent, {
      width: '500px',
      data: works
    });

    dialogRef.afterClosed().subscribe((results: TrainingWork[]) => {
      if (results) {
        for (let index = 0; index < results.length; index++) {
          results[index].order = index + 1;
        }

        for (const result of results) {
          this.fbService.updateTrainingWorkOrder(result).subscribe();
        }
      }
    });
  }

  openWorkResultDialog(selectedTrainingWork: TrainingWork, load: TrainingWorkLoad): void {
    load.resultRpe = selectedTrainingWork.rpe;
    load.resultLoad = load.load;

    const dialogRef = this.dialog.open(WorkLoadResultComponent, {
      width: '500px',
      data: load
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkLoad) => {
      if (result) {
        this.fbService.setTrainingWorkResult(selectedTrainingWork.id, result).subscribe();
      }
    });
  }
}
