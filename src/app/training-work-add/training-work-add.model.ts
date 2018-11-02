import { TrainingWorkLoad } from './../training-plan/training-week/training-day/training-work/training-work-load/training-work-load.model';
import { TrainingWork } from '../training-plan/training-week/training-day/training-work/training-work.model';

export class TrainingWorkAdd {
  constructor(public trainingWork: TrainingWork, public trainingWorkLoad: TrainingWorkLoad) {}
}
