import { Observable } from 'rxjs';

import { TrainingWeek } from './training-week/training-week.model';

export class TrainingPlan {
  constructor() {}
  id: string;
  name: string;
  level: string;
  detail: string;

  weeks: Observable<TrainingWeek[]> | null = null;
}
