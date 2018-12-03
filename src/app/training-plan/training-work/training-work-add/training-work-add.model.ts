import { TrainingWork } from '../training-work.model';
import { TrainingWorkLoad } from '../../training-work-load/training-work-load.model';

export class TrainingWorkAdd {
  constructor(public trainingWork: TrainingWork, public trainingWorkLoad: TrainingWorkLoad) {}

  squatMax: number;
  benchMax: number;
  deadliftMax: number;
}
