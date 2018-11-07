import { Observable } from 'rxjs';

import { TrainingDay } from './training-day/training-day.model';

export class TrainingWeek {
  constructor(public name: string, public order: number, public trainingPlanId: string) {}

  id: string;
  days: Observable<TrainingDay[]> | null = null;
}
