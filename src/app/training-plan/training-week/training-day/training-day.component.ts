import { ActivatedRoute } from '@angular/router';
import { TrainingDay } from './training-day.model';

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { FirebaseService } from './../../../firebase.service';
import { TrainingDayAddComponent } from './training-day-add/training-day-add.component';

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
}
