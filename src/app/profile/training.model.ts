import { TrainingWeek } from '../training-plan/training-week/training-week.model';

export class Training {
  constructor() {
    this.weeks = [];
  }
  id: string;
  name: string;
  level: string;

  weeks: TrainingWeek[];
}
