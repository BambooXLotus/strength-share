import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { TrainingDayAddDialogService } from '../training-plan/training-day/training-day-add/training-day-add-dialog.service';
import { TrainingWorkLoad } from '../training-plan/training-work-load/training-work-load.model';
import { TrainingWork } from '../training-plan/training-work/training-work.model';
import { FirebaseService } from './../firebase.service';
import { CalcService } from './../services/calc/calc.service';
import { TrainingDay } from './../training-plan/training-day/training-day.model';
import { TrainingPlan } from './../training-plan/training-plan.model';
import { TrainingWeek } from './../training-plan/training-week/training-week.model';
import { TrainingWorkDialogService } from './../training-plan/training-work/training-work-dialog.service';
import { WorkLoadResultDialogService } from './../work-load-result/work-load-result-dialog.service';
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
    public snackBar: MatSnackBar,
    private resultDialog: WorkLoadResultDialogService,
    private addDayDialog: TrainingDayAddDialogService,
    private workDialog: TrainingWorkDialogService
  ) {}

  //   profile: Profile;
  weekForm: FormGroup;
  currentProfile: Observable<Profile> | null = null;
  enableWorkSort: boolean;
  displayedColumns: string[] = ['name', 'restTime', 'repsDisplay', 'sets', 'load'];
  weekName: string;

  private trainingPlanDetail$ = new Subject<TrainingPlan>();

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get('username');

    // this.profile = this.createProfile();

    // this.profile.currentTraining = this.createTraining();

    this.currentProfile = this.firebaseService.getProfileDeep(userName);

    this.weekForm = this.fb.group({
      sushi: '',
      message: ''
    });

    // const donkey = this.trainingPlanDetail$
    //   .pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     switchMap((s) => {
    //       this.firebaseService.updateTrainingPlanDetail(s).subscribe();
    //     })
    //   )
    //   .subscribe();
  }

  addWeek(planId: string, weekOrder: number) {
    const trainingWeek = new TrainingWeek(this.weekName, weekOrder, planId);

    this.firebaseService.addTrainingWeek(trainingWeek).subscribe((s) => {
      this.weekName = '';

      this.snackBar.open('Week Added', '', { duration: 3000 });
    });
  }

  openCopyWeekDialog(weekId: string, squatMax: number, benchMax: number, deadliftMax: number): void {
    this.firebaseService.getTrainingWeek(weekId).subscribe((resultWeek) => {
      const dupeWeek = new TrainingWeek(resultWeek.name + '_Copy', resultWeek.order + 1, resultWeek.trainingPlanId);

      this.firebaseService.addTrainingWeek(dupeWeek).subscribe((resultAddWeek) => {
        resultWeek.days.subscribe((resultDays) => {
          for (const day of resultDays) {
            const dupeDay = new TrainingDay(day.order, day.name, resultAddWeek.id);

            this.firebaseService.addTrainingDay(dupeDay).subscribe((resultDupeDay) => {
              day.works.subscribe((resultWorks) => {
                for (const work of resultWorks) {
                  const dupeWork = new TrainingWork(
                    work.order,
                    work.name,
                    work.sets,
                    work.setsDisplay,
                    work.rpe,
                    work.reps,
                    work.repsDisplay,
                    work.restTime
                  );

                  dupeWork.trainingPlanDayId = resultDupeDay.id;

                  this.firebaseService.addTrainingWork(dupeWork).subscribe((resultDupeWork) => {
                    //Display snackbar
                    // const dupeTrainingLoad = new TrainingWorkLoad()
                    // this.firebaseService.setTrainingWorkWeight(resultDupeWork, )
                  });
                }
              });
            });
          }
        });
      });
    });
  }

  openAddDayDialog(weekId: string, dayCount: number): void {
    this.addDayDialog.open(weekId, dayCount);
  }

  openAddWorkDialog(dayId: string, workCount: number, squatMax: number, benchMax: number, deadliftMax: number): void {
    console.log(benchMax);
    this.workDialog.openAdd(dayId, workCount, squatMax, benchMax, deadliftMax);
  }

  openEditWorkDialog(
    work: TrainingWork,
    load: TrainingWorkLoad,
    squatMax: number,
    benchMax: number,
    deadliftMax: number
  ): void {
    this.workDialog.openEdit(work, load, squatMax, benchMax, deadliftMax);
  }

  openSortWorkDialog(works: TrainingWork[]): void {
    this.workDialog.openSort(works);
  }

  openWorkResultDialog(selectedTrainingWork: TrainingWork, load: TrainingWorkLoad): void {
    this.resultDialog.Open(selectedTrainingWork, load);
  }

  removeWork(trainingWorkId: string) {
    this.firebaseService.deleteTrainingWork(trainingWorkId).subscribe();
  }

  updateDaysOrder(e) {
    console.log(e);
  }

  uploadPhoto(event) {
    const file = event.target.files[0];

    this.firebaseService.uploadPhoto(file);
  }

  saveTrainingPlanDetails(trainingPlan: TrainingPlan) {
    this.trainingPlanDetail$.next(trainingPlan);
  }

  copyMaxFromProfile(weekId: string, profileId: string) {
    this.firebaseService.setTrainingPlanWeekMax(weekId, profileId).subscribe(() => {
      this.snackBar.open('Copied Over', '', { duration: 3000 });
    });
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
