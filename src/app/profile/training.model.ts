import { TrainingWeek } from './training-week.model';

export class Training {
  constructor() {
    this.weeks = [];
  }
  id: string;
  name: string;
  level: string;

  weeks: TrainingWeek[];
}
