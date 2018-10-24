import { Observable } from 'rxjs';

import { TrainingWork } from './training-work/training-work.model';

export class TrainingDay {
  constructor(public name: string, public order: number, public trainingPlanWeekId: string) {}

  id: string;
  works: Observable<TrainingWork[]> | null = null;
}
