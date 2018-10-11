import { LiftInput } from './../input/lift-input/lift-input.model';
import { Component, Input, OnInit } from '@angular/core';

import { CalcService, CalcLoadInput } from './../services/calc/calc.service';
import { ExerciseInput } from './exercise/exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  @Input()
  inputs: ExerciseInput[] = new Array<ExerciseInput>();
  RepMaxes: RepMax[] = [new RepMax('Bench', 165), new RepMax('Squat', 265), new RepMax('Deadlift', 295)];

  days: Day[] = [];

  exercises = [
    { value: 'squat', viewValue: 'Squat' },
    { value: 'bench', viewValue: 'Bench' },
    { value: 'deadlift', viewValue: 'Deadlift' }
  ];

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.inputs.push(new ExerciseInput('', 0, 0, 0));

    this.days.push(this.createDay1());
    this.days.push(this.createDay2());
    this.days.push(this.createDay3());
    this.days.push(this.createDay4());
  }

  createDay1() {
    const lifts: Lift[] = [];
    const benchInput: CalcLoadInput = { rpe: 7, reps: 6, repMaxEst: this.RepMaxes[0].weight };
    const bench = this.calcService.calcLoad(benchInput);
    const squatInput: CalcLoadInput = { rpe: 7, reps: 6, repMaxEst: this.RepMaxes[1].weight };
    const squat = this.calcService.calcLoad(squatInput);

    lifts.push({ name: 'Squat', reps: '6', sets: 3, weight: squat.toString(), restTime: '3-4 min' });
    lifts.push({ name: 'Bench', reps: '6', sets: 3, weight: bench.toString(), restTime: '2-3 min' });
    lifts.push({ name: 'Barbell Curls', reps: '8-12', sets: 4, weight: 'bar', restTime: '1 min' });
    lifts.push({ name: 'Hanging Ab Raise', reps: 'Max', sets: 3, weight: 'body weight', restTime: '1 min' });

    return { name: 'Day 1 - HF - LI - Bro', lifts: lifts };
  }

  createDay2() {
    const day1Lifts: Lift[] = [];
    const benchInput: CalcLoadInput = { rpe: 7, reps: 3, repMaxEst: this.RepMaxes[0].weight };
    const bench = this.calcService.calcLoad(benchInput);
    const deadliftInput: CalcLoadInput = { rpe: 7, reps: 6, repMaxEst: this.RepMaxes[2].weight };
    const deadlift = this.calcService.calcLoad(deadliftInput, 0.6);
    const cgInput: CalcLoadInput = { rpe: 7, reps: 6, repMaxEst: this.RepMaxes[0].weight };
    const cgBench = this.calcService.calcLoad(benchInput, 0.6);

    day1Lifts.push({
      name: 'Romanian DL',
      reps: deadliftInput.reps + '',
      sets: 3,
      weight: deadlift.toString(),
      restTime: '3-4 min'
    });

    day1Lifts.push({
      name: 'Bench',
      reps: benchInput.reps.toString(),
      sets: 3,
      weight: bench.toString(),
      restTime: '2-3 min'
    });

    day1Lifts.push({
      name: 'CG Bench',
      reps: cgInput.reps.toString(),
      sets: 3,
      weight: cgBench + '',
      restTime: '1 min'
    });
    day1Lifts.push({ name: 'Wide Stance Push Ups', reps: '15-20', sets: 4, weight: 'body weight', restTime: '1 min' });
    day1Lifts.push({ name: 'Planks', reps: '1 min', sets: 3, weight: 'body weight', restTime: '1 min' });

    return { name: 'Day 2 - HF - Vol Tri, Chest', lifts: day1Lifts };
  }

  createDay3() {
    const day1Lifts: Lift[] = [];
    const benchInput: CalcLoadInput = { rpe: 7, reps: 6, repMaxEst: this.RepMaxes[0].weight };
    const bench = this.calcService.calcLoad(benchInput);
    const squatInput: CalcLoadInput = { rpe: 7, reps: 3, repMaxEst: this.RepMaxes[1].weight };
    const squat = this.calcService.calcLoad(squatInput);

    day1Lifts.push({
      name: 'Squat',
      reps: squatInput.reps + '',
      sets: 3,
      weight: squat.toString(),
      restTime: '3-4 min'
    });
    day1Lifts.push({
      name: 'Bench',
      reps: benchInput.reps + '',
      sets: 3,
      weight: bench.toString(),
      restTime: '2-3 min'
    });
    day1Lifts.push({ name: 'Barbell Curls', reps: '8-12', sets: 4, weight: 'bar', restTime: '1 min' });
    day1Lifts.push({ name: 'Hanging Ab Raise', reps: 'Max', sets: 3, weight: 'body weight', restTime: '1 min' });

    return { name: 'Day 3 - HF - LI - Bro Again', lifts: day1Lifts };
  }

  createDay4() {
    const day1Lifts: Lift[] = [];
    const benchInput: CalcLoadInput = { rpe: 7, reps: 10, repMaxEst: this.RepMaxes[0].weight };
    const bench = this.calcService.calcLoad(benchInput, 0.65);
    const deadliftInput: CalcLoadInput = { rpe: 7, reps: 3, repMaxEst: this.RepMaxes[2].weight };
    const deadlift = this.calcService.calcLoad(deadliftInput);

    day1Lifts.push({
      name: 'Deadlift',
      reps: deadliftInput.reps + '',
      sets: 3,
      weight: deadlift.toString(),
      restTime: '4-5 min'
    });

    day1Lifts.push({
      name: '3/1/1 Bench',
      reps: '8-12',
      sets: 8,
      weight: bench.toString(),
      restTime: '2 min'
    });

    day1Lifts.push({ name: 'Chin Ups', reps: 'Max', sets: 3, weight: 'body weight', restTime: '1 min' });
    day1Lifts.push({ name: 'Planks', reps: '1 min', sets: 3, weight: 'body weight', restTime: '1 min' });

    return { name: 'Day 4 - Deadlift - Vol Chest', lifts: day1Lifts };
  }

  addLift() {
    if (this.inputs.length < 20) {
      this.inputs.push(new ExerciseInput('', 0, 0, 0));
    }
  }

  removeLift(index: number) {
    console.log(index);
    this.inputs.splice(index, 1);
  }
}

export class RepMax {
  constructor(public lift: string, public weight: number) {}
}

export interface Lift {
  name: string;
  reps: string;
  sets: number;
  weight: string;
  restTime: string;
}

export interface Day {
  // id: string;
  name: string;
  lifts: Lift[];
}
