import { TrainingWeek } from './training-week/training-week.model';

export class TrainingPlan {
  constructor() {
    this.weeks = [];
  }
  id: string;
  name: string;
  level: string;

  weeks: TrainingWeek[];
}
