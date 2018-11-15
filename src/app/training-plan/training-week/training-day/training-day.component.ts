import { TrainingWorksSortComponent } from './../../../training-works-sort/training-works-sort.component';
import { ActivatedRoute } from '@angular/router';
import { TrainingDay } from './training-day.model';

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { FirebaseService } from './../../../firebase.service';
import { TrainingDayAddComponent } from './training-day-add/training-day-add.component';
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
}
