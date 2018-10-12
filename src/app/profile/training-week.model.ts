import { TrainingDay } from './training-day.Model';

export class TrainingWeek {
  constructor() {
    this.days = [];
  }

  id: string;
  name: string;
  order: number;

  days: TrainingDay[];
}
