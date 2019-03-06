import { Observable } from 'rxjs';

import { TrainingPlan } from '../training-plan/training-plan.model';
import { Training } from './training.model';

export class Profile {
  constructor() {}

  id: string;
  name: string;
  photo: string;
  weight: number;
  height: number;
  notes: string;

  benchMax: number;
  squatMax: number;
  deadliftMax: number;

  //   currentTraining: Training;
  currentTrainingPlanId: string;
  currentTrainingPlan: Observable<TrainingPlan> | null = null;

  //   training: Training[];
}
