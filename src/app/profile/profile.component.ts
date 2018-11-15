import { WorkLoadResultComponent } from './../work-load-result/work-load-result.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TrainingDay } from '../training-plan/training-week/training-day/training-day.model';
import { TrainingWorkLoad } from '../training-plan/training-week/training-day/training-work/training-work-load/training-work-load.model';
import { TrainingWork } from '../training-plan/training-week/training-day/training-work/training-work.model';
import { TrainingWorkAdd } from '../training-work-add/training-work-add.model';
import { FirebaseService } from './../firebase.service';
import { CalcService } from './../services/calc/calc.service';
import { TrainingDayAddComponent } from './../training-plan/training-week/training-day/training-day-add/training-day-add.component';
import { TrainingWeek } from './../training-plan/training-week/training-week.model';
import { TrainingWorkAddComponent } from './../training-work-add/training-work-add.component';
import { TrainingWorksSortComponent } from './../training-works-sort/training-works-sort.component';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private calcService: CalcService,
    private firebaseService: FirebaseService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  //   profile: Profile;
  weekForm: FormGroup;
  currentProfile: Observable<Profile> | null = null;
  enableWorkSort: boolean;
  displayedColumns: string[] = ['name', 'restTime', 'repsDisplay', 'sets', 'load'];

  weekName: string;
  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('username');

    // this.profile = this.createProfile();

    // this.profile.currentTraining = this.createTraining();

    this.currentProfile = this.firebaseService.getProfileDeep(userName);

    this.weekForm = this.fb.group({
      sushi: '',
      message: ''
    });

    // this.firebaseService.getProfile('sanka').subscribe((s) => console.log(s));
  }

  addWeek(trainingPlanId: string, weekOrder: number) {
    const trainingWeek = new TrainingWeek(this.weekName, weekOrder, trainingPlanId);

    console.log(trainingWeek);

    this.firebaseService.addTrainingWeek(trainingWeek).subscribe((s) => {
      this.weekName = '';

      this.snackBar.open('Week Added', '', { duration: 3000 });
    });
  }

  openAddDayDialog(trainingPlanWeekId: string, dayCount: number): void {
    const currentDayCount = dayCount + 1;
    const trainingDay = new TrainingDay(currentDayCount, 'Day ' + currentDayCount, trainingPlanWeekId);

    const dialogRef = this.dialog.open(TrainingDayAddComponent, {
      width: '250px',
      data: trainingDay
    });

    dialogRef.afterClosed().subscribe((result: TrainingDay) => {
      console.log('The dialog was closed');
      console.log(result);

      this.firebaseService.addTrainingDay(result).subscribe((s) => console.log(s));
    });
  }

  openAddWorkDialog(trainingPlanDayId: string, workCount: number): void {
    const trainingWork = new TrainingWork(workCount + 1, 'Bench', 3, '3', 7, 6, 6 + '-' + (6 + 2), '3-4mins');
    const trainingWorkAdd = new TrainingWorkAdd(trainingWork, new TrainingWorkLoad('', 0, '0'));

    const dialogRef = this.dialog.open(TrainingWorkAddComponent, {
      width: '400px',
      data: trainingWorkAdd
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkAdd) => {
      if (result) {
        result.trainingWork.trainingPlanDayId = trainingPlanDayId;

        this.firebaseService.addTrainingWork(result.trainingWork).subscribe((s) => {
          console.log('deren');
          console.log(s);
          this.firebaseService.setTrainingWorkWeight(s.id, result.trainingWorkLoad).subscribe((s2) => console.log(s2));
        });
      }
    });
  }

  openEditWorkDialog(selectedTrainingWork: TrainingWork, load: TrainingWorkLoad): void {
    const trainingWork = new TrainingWork(
      selectedTrainingWork.order,
      selectedTrainingWork.name,
      selectedTrainingWork.sets,
      selectedTrainingWork.setsDisplay,
      selectedTrainingWork.rpe,
      selectedTrainingWork.reps,
      selectedTrainingWork.repsDisplay,
      selectedTrainingWork.restTime
    );
    trainingWork.id = selectedTrainingWork.id;
    console.log(load);

    const trainingWorkAdd = new TrainingWorkAdd(trainingWork, load);

    const dialogRef = this.dialog.open(TrainingWorkAddComponent, {
      width: '500px',
      data: trainingWorkAdd
    });

    dialogRef.afterClosed().subscribe((result: TrainingWorkAdd) => {
      if (result) {
        this.firebaseService.updateTrainingWork(result.trainingWork).subscribe((s) => {
          this.firebaseService
            .setTrainingWorkWeight(selectedTrainingWork.id, result.trainingWorkLoad)
            .subscribe((s2) => console.log(s2));
        });
      }
    });
  }

  openSortWorkDialog(works: TrainingWork[]): void {
    console.log(works);
    const dialogRef = this.dialog.open(TrainingWorksSortComponent, {
      width: '500px',
      data: works
    });

    dialogRef.afterClosed().subscribe((results: TrainingWork[]) => {
      console.log(results);

      if (results) {
        for (let index = 0; index < results.length; index++) {
          results[index].order = index + 1;
        }

        for (const result of results) {
          this.firebaseService.updateTrainingWorkOrder(result).subscribe();
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
        this.firebaseService.setTrainingWorkResult(selectedTrainingWork.id, result).subscribe();
      }
    });
  }

  removeWork(trainingWorkId: string) {
    this.firebaseService.deleteTrainingWork(trainingWorkId).subscribe();
  }

  updateDaysOrder(e) {
    console.log(e);
  }
  //   createProfile(): Profile {
  //     const profile = new Profile();

  //     profile.id = 'tiff';
  //     profile.name = 'Tiffany T';
  //     profile.bodyWeight = 110;
  //     profile.height = 55;
  //     profile.benchMax = 135;
  //     profile.squatMax = 250;
  //     profile.deadliftMax = 315;

  //     return profile;
  //   }

  //   createTraining(): Training {
  //     const training = new Training();

  //     training.level = 'Intermediate';
  //     training.name = 'RP Meet Prep';

  //     training.weeks.push(this.createTrainingWeek1());

  //     return training;
  //   }

  //   createTrainingWeek1(): TrainingWeek {
  //     const week = new TrainingWeek();

  //     week.name = 'Week 1 Intro';

  //     const days: TrainingDay[] = [];
  //     days.push(this.createWeek1Day1());
  //     days.push(this.createWeek1Day2());

  //     week.days = days.sort((s) => s.order).reverse();

  //     return week;
  //   }

  //   createWeek1Day1(): TrainingDay {
  //     const day = new TrainingDay('Day 1', 1);

  //     const squatInput = new CalcLoadInput1(8, 4, this.profile.squatMax);
  //     const squatLoad = this.calcService.calcLoadV1(squatInput);
  //     const squat = new TrainingWork(
  //       1,
  //       'Comp Squat',
  //       squatLoad + '',
  //       '5',
  //       squatInput.reps - 1 + '-' + (squatInput.reps + 2),
  //       '4-5min'
  //     );
  //     day.works.push(squat);

  //     const benchInput = new CalcLoadInput1(6.5, 3, this.profile.benchMax);
  //     const benchLoad = this.calcService.calcLoadV1(benchInput, 0.8);
  //     const bench = new TrainingWork(2, 'Comp Bench', benchLoad + '', '3', '1/3', '2-3min');
  //     day.works.push(bench);

  //     const deadliftInput = new CalcLoadInput1(6.5, 3, this.profile.deadliftMax);
  //     const deadliftLoad = this.calcService.calcLoadV1(deadliftInput, 0.8);
  //     const deadlift = new TrainingWork(3, 'Comp Deadlift', deadliftLoad + '', '3', '1/3', '4-5min');
  //     day.works.push(deadlift);

  //     day.works.push(new TrainingWork(4, 'Pull Ups', 'Bodyweight', '3', 'Max', '1min'));
  //     day.works.push(new TrainingWork(4, 'Ab Roller', 'Bodyweight', '2', 'Max', '1min'));

  //     return day;
  //   }

  //   createWeek1Day2(): TrainingDay {
  //     const works: TrainingWork[] = [];

  //     const squatInput = new CalcLoadInput1(8, 4, this.profile.squatMax);
  //     const squatLoad = this.calcService.calcLoadV1(squatInput);
  //     const squat = new TrainingWork(5, 'Comp Squat', squatLoad + '', '5', '1/3', '4-5min');
  //     works.push(squat);

  //     const benchInput = new CalcLoadInput1(8, 6, this.profile.benchMax);
  //     const benchLoad = this.calcService.calcLoadV1(benchInput);
  //     const bench = new TrainingWork(
  //       1,
  //       'Comp Bench',
  //       benchLoad + '',
  //       '3',
  //       benchInput.reps - 1 + '-' + (benchInput.reps + 2),
  //       '2-3min'
  //     );
  //     const fatSets = this.generateFatigueSets(5, 5, benchInput, bench);
  //     works.push(...fatSets);

  //     const deadliftInput = new CalcLoadInput1(6.5, 3, this.profile.deadliftMax);
  //     const deadliftLoad = this.calcService.calcLoadV1(deadliftInput, 0.8);
  //     const deadlift = new TrainingWork(6, 'Comp Deadlift', deadliftLoad + '', '3', '1/3', '4-5min');
  //     works.push(deadlift);

  //     works.push(new TrainingWork(7, 'Pull Ups', 'Bodyweight', '3', 'Max', '1min'));
  //     works.push(new TrainingWork(8, 'Ab Roller', 'Bodyweight', '2', 'Max', '1min'));

  //     const day = new TrainingDay('Day 2', 2);
  //     day.works = works.sort((a, b) => a.order - b.order);

  //     return day;
  //   }

  //   generateFatigueSets(sets: number, fatigue: number, input: CalcLoadInput1, work: TrainingWork): TrainingWork[] {
  //     const workingSets: TrainingWork[] = [];

  //     for (let i = 0; i < sets; i++) {
  //       const load = this.calcService.calcLoadV1(input);
  //       const working = new TrainingWork(i, work.name, load + '', '1', fatigue - i + '', work.restTime);

  //       workingSets.push(working);
  //     }

  //     return workingSets;
  //   }
}
