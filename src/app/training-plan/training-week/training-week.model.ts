import { Observable } from 'rxjs';

import { TrainingDay } from '../training-day/training-day.model';
import { TrainingWeekMax } from './training-week-max.model';

export class TrainingWeek {
  constructor(public name: string, public order: number, public trainingPlanId: string) {}

  id: string;
  days: Observable<TrainingDay[]> | null = null;
  max: Observable<TrainingWeekMax> | null = null;
}
