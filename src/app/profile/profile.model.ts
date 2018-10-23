import { Training } from './training.model';

export class Profile {
  constructor() {}

  id: string;
  name: string;
  photo: string;
  weight: number;
  height: number;

  benchMax: number;
  squatMax: number;
  deadliftMax: number;

  //   currentTraining: Training;
  currentTrainingPlanId: string;
  training: Training[];
}
