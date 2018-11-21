import { Observable } from 'rxjs';

import { TrainingWorkLoad } from '../training-work-load/training-work-load.model';

export class TrainingWork {
  constructor(
    public order: number,
    public name: string,
    public sets: number,
    public setsDisplay: string,
    public rpe: number,
    public reps: number,
    public repsDisplay: string,
    public restTime: string
  ) {}

  id: string;
  trainingPlanDayId: string;
  mod: number;
  load: Observable<TrainingWorkLoad> | null = null;
}
