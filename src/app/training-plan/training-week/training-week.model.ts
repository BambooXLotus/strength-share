import { TrainingDay } from './training-day/training-day.model';

export class TrainingWeek {
  constructor(public id: string, public name: string, public order: number, public days: TrainingDay[]) {}
}
