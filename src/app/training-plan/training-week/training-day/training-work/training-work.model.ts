import { Observable } from 'rxjs';

import { TrainingWorkLoad } from './training-work-load/training-work-load.model';

export class TrainingWork {
  constructor(
    public order: number,
    public name: string,
    public sets: string,
    public rpe: number,
    public reps: number,
    public restTime: string
  ) {}

  id: string;
  trainingPlanDayId: string;
  load: Observable<TrainingWorkLoad> | null = null;
}
