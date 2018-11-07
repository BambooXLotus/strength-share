import { Observable } from 'rxjs';

import { TrainingWork } from './training-work/training-work.model';

export class TrainingDay {
  constructor(public order: number, public name: string, public trainingPlanWeekId: string) {}

  id: string;
  works: Observable<TrainingWork[]> | null = null;
}
