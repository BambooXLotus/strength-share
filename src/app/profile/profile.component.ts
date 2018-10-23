import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FirebaseService } from './../firebase.service';
import { CalcService } from './../services/calc/calc.service';
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
    private firebaseService: FirebaseService
  ) {}

  //   profile: Profile;

  currentProfile: Observable<Profile> | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('username');

    // this.profile = this.createProfile();

    // this.profile.currentTraining = this.createTraining();

    this.currentProfile = this.firebaseService.getProfile('bambooderen');

    // this.firebaseService.getProfile('sanka').subscribe((s) => console.log(s));
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
